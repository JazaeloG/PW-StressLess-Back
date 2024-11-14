import { TestResultadoRepository } from "src/core/domain/test-resultado/test-resultado.repository";
import { TestResultado } from "src/core/domain/test-resultado/test-resultado.entity";
import { CrearTestResultadoDto } from "src/app/dtos/test-resultado/crear-test-resultado.dto";
import { ActualizarTestResultadoDto } from "src/app/dtos/test-resultado/actualizar-test-resultado.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { TestResultadoEntity } from "../database/test-resultado.entity.schema";

@Injectable()
export class TestResultadoRepositoryImpl implements TestResultadoRepository {

    constructor(
        @InjectRepository(TestResultadoEntity)
        private readonly testResultadoRepository: Repository<TestResultadoEntity>,
    ) { }

    async crearTestResultado(testResultado: CrearTestResultadoDto): Promise<TestResultado> {
        try {
            const nuevoTestResultado = this.testResultadoRepository.create(testResultado);
            return await this.testResultadoRepository.save(nuevoTestResultado);
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
        return testResultado;
    }

    async obtenerTestResultados(): Promise<TestResultado[]> {
        return this.testResultadoRepository.find();
    }

    async actualizarTestResultado(testResultadoID: number, testResultado: ActualizarTestResultadoDto): Promise<TestResultado> {
        const testResultadoExistente = await this.testResultadoRepository.findOne({ where: { id_TestResultado: testResultadoID } });
        if (!testResultadoExistente) {
            throw new HttpException('Resultado del test no encontrado', HttpStatus.NOT_FOUND);
        }

        Object.assign(testResultadoExistente, testResultado);

        try {
            return await this.testResultadoRepository.save(testResultadoExistente);
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
}