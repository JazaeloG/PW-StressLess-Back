import { TestResultadoRepository } from "src/core/domain/test-resultado/test-resultado.repository";
import { TestResultado } from "src/core/domain/test-resultado/test-resultado.entity";
import { CrearTestResultadoDto } from "src/app/dtos/test-resultado/crear-test-resultado.dto";
import { ActualizarTestResultadoDto } from "src/app/dtos/test-resultado/actualizar-test-resultado.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository, DeepPartial } from 'typeorm';
import { TestResultadoEntity } from "../database/test-resultado.entity.schema";

@Injectable()
export class TestResultadoRepositoryImpl implements TestResultadoRepository {

    constructor(
        @InjectRepository(TestResultadoEntity)
        private readonly testResultadoRepository: Repository<TestResultadoEntity>,
    ) { }

    async crearTestResultado(testResultadoDto: CrearTestResultadoDto): Promise<TestResultado> {
        try {
            // Mapeo explícito entre DTO y entidad
            const nuevoTestResultado: DeepPartial<TestResultadoEntity> = {
                usuario: { id_Usuario: Number(testResultadoDto.usuarioId) } as any,
                test: { id_Test: Number(testResultadoDto.testId) } as any,
                testResultado_Puntaje: testResultadoDto.testResultado_Puntaje,
                testResultado_Comentarios: testResultadoDto.testResultado_Comentarios,
                testResultado_Fecha: testResultadoDto.testResultado_Fecha
            };

            const testResultadoEntity = this.testResultadoRepository.create(nuevoTestResultado);
            const savedTestResultado = await this.testResultadoRepository.save(testResultadoEntity);
            return this.mapEntityToDomain(savedTestResultado);
        } catch (error) {
            console.error('Error al guardar el nuevo resultado del test:', error);
            throw new HttpException('Error al crear el resultado del test', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async obtenerTestResultadoPorID(testResultadoID: number): Promise<TestResultado | null> {
        const testResultado = await this.testResultadoRepository.findOne({ where: { id_TestResultado: testResultadoID } });
        if (!testResultado) {
            throw new HttpException('Resultado del test no encontrado', HttpStatus.NOT_FOUND);
        }
        return this.mapEntityToDomain(testResultado);
    }

    async obtenerTestResultados(): Promise<TestResultado[]> {
        const testResultados = await this.testResultadoRepository.find();
        return testResultados.map(entity => this.mapEntityToDomain(entity));
    }

    async actualizarTestResultado(testResultadoID: number, testResultadoDto: ActualizarTestResultadoDto): Promise<TestResultado> {
        const testResultadoExistente = await this.testResultadoRepository.findOne({ where: { id_TestResultado: testResultadoID } });
        if (!testResultadoExistente) {
            throw new HttpException('Resultado del test no encontrado', HttpStatus.NOT_FOUND);
        }

        Object.assign(testResultadoExistente, {
            testResultado_Puntaje: testResultadoDto.testResultado_Puntaje,
            testResultado_Comentarios: testResultadoDto.testResultado_Comentarios,
            testResultado_Fecha: testResultadoDto.testResultado_Fecha,
        });

        try {
            const updatedTestResultado = await this.testResultadoRepository.save(testResultadoExistente);
            return this.mapEntityToDomain(updatedTestResultado);
        } catch (error) {
            console.error('Error al actualizar el resultado del test:', error);
            throw new HttpException('Error al actualizar el resultado del test', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async eliminarTestResultado(testResultadoID: number): Promise<void> {
        const testResultadoExistente = await this.testResultadoRepository.findOne({ where: { id_TestResultado: testResultadoID } });
        if (!testResultadoExistente) {
            throw new HttpException('Resultado del test no encontrado', HttpStatus.NOT_FOUND);
        }

        try {
            await this.testResultadoRepository.remove(testResultadoExistente);
        } catch (error) {
            console.error('Error al eliminar el resultado del test:', error);
            throw new HttpException('Error al eliminar el resultado del test', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Método de mapeo para convertir de entidad a dominio
    private mapEntityToDomain(entity: TestResultadoEntity): TestResultado {
        return {
            id_TestResultado: entity.id_TestResultado,
            usuarioId: entity.usuario.id_Usuario,
            testId: entity.test.id_Test,
            testResultado_Puntaje: entity.testResultado_Puntaje,
            testResultado_Comentarios: entity.testResultado_Comentarios,
            testResultado_Fecha: entity.testResultado_Fecha,
        };
    }
}
