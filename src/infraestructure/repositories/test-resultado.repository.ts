import { TestResultadoRepository } from "src/core/domain/test-resultado/test-resultado.repository";
import { TestResultado } from "src/core/domain/test-resultado/test-resultado.entity";
import { CrearTestResultadoDto } from "src/app/dtos/test-resultado/crear-test-resultado.dto";
import { ActualizarTestResultadoDto } from "src/app/dtos/test-resultado/actualizar-test-resultado.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Repository, DeepPartial, Connection, DataSource, LessThanOrEqual, In } from 'typeorm';
import { TestResultadoEntity } from "../database/test-resultado.entity.schema";
import { ProgresoUsuarioEntity } from "../database/progreso-usuario.entity.schema";
import { UsuarioEntity } from "../database/usuario.entity.schema";
import { TestEntity } from "../database/test.entity.schema";
import { CrearProgresoUsuarioDto } from "src/app/dtos/progreso/crear-progreso.dto";
import { Recomendacion } from "src/core/domain/recomendacion/recomendacion.entity";
import { RecomendacionEntity } from "../database/recomendacion.entity.schema";
import { RecomendacionUsuarioEntity } from "../database/recomendacion-usuario.entity.schema";

@Injectable()
export class TestResultadoRepositoryImpl implements TestResultadoRepository {

    constructor(
        @InjectRepository(TestResultadoEntity)
        private readonly testResultadoRepository: Repository<TestResultadoEntity>,

        @InjectRepository(ProgresoUsuarioEntity)
        private readonly progresoUsuarioRepository: Repository<ProgresoUsuarioEntity>,

        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,

        @InjectRepository(TestEntity)
        private readonly testRepository: Repository<TestEntity>,

        @InjectRepository(RecomendacionEntity)
        private readonly recomendacionRepository: Repository<RecomendacionEntity>,

        @InjectRepository(RecomendacionUsuarioEntity)
        private readonly recomendacionUsuarioRepository: Repository<RecomendacionUsuarioEntity>,

        private con: DataSource,
    ) { }

    async crearTestResultado(testResultadoDto: CrearTestResultadoDto): Promise<TestResultado> {
        const queryRunner = this.con.createQueryRunner();
    
        try {
            await queryRunner.startTransaction();
    
            // Validar existencia de Usuario y Test
            const usuario = await this.usuarioRepository.findOne({ where: { id_Usuario: testResultadoDto.usuarioId } });
            if (!usuario) {
                throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
            }
    
            const test = await this.testRepository.findOne({ where: { id_Test: testResultadoDto.testId } });
            if (!test) {
                throw new HttpException('Test no encontrado', HttpStatus.NOT_FOUND);
            }
    
            // Crear TestResultado
            const nuevoTestResultado = {
                usuario: usuario,
                test: test,
                testResultado_Puntaje: testResultadoDto.testResultado_Puntaje,
                testResultado_Comentarios: testResultadoDto.testResultado_Comentarios,
                testResultado_Fecha: new Date(),
            };
    
            const testResultado = this.testResultadoRepository.create(nuevoTestResultado);
            const savedTestResultado = await this.testResultadoRepository.save(testResultado);
            const resultadosAnterior = await this.progresoUsuarioRepository.find({ where: { usuario: usuario }, order: { progreso_Fecha: 'DESC' }, take: 1 });
            const progresoUsuarioDto = { 
                usuario: usuario,
                nivel_EstresAntes: resultadosAnterior.length > 0 ? resultadosAnterior[0].nivel_EstresNuevo : 0,
                nivel_EstresNuevo: testResultadoDto.testResultado_Puntaje,
                progreso_Fecha: new Date(),
            };
    
            await this.progresoUsuarioRepository.save(progresoUsuarioDto);

            const recomendaciones = await this.recomendacionRepository.find({
                where: { recomendacion_NivelRecomendacion: LessThanOrEqual(testResultadoDto.testResultado_Puntaje) },
            });

            const nuevaRecomendacionUsuario = new RecomendacionUsuarioEntity();
        nuevaRecomendacionUsuario.usuario = usuario;
        nuevaRecomendacionUsuario.recomendaciones = recomendaciones;

        
        await this.recomendacionUsuarioRepository.delete({ usuario: usuario });

        await this.recomendacionUsuarioRepository.save(nuevaRecomendacionUsuario);
    
            await queryRunner.commitTransaction();
    
            return savedTestResultado;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error('Error al guardar el nuevo resultado del test:', error);
            throw new HttpException('Error al crear el resultado del test', HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            await queryRunner.release();
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
        const testResultados = await this.testResultadoRepository.find();
        return testResultados;
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
            return updatedTestResultado;
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
