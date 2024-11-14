import { TestRepository } from "src/core/domain/test/test.repository";
import { Test } from "src/core/domain/test/test.entity";
import { CrearTestDto } from "src/app/dtos/test/crear-test.dto";
import { ActualizarTestDto } from "src/app/dtos/test/actualizar-test.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { TestEntity } from "../database/test.entity.schema";

@Injectable()
export class TestRepositoryImpl implements TestRepository {

    constructor(
        @InjectRepository(TestEntity)
        private readonly testRepository: Repository<TestEntity>,
    ) { }

    async crearTest(test: CrearTestDto): Promise<Test> {
        try {
            const nuevoTest = this.testRepository.create(test);
            return await this.testRepository.save(nuevoTest);
        } catch (error) {
            console.error('Error al guardar el nuevo test:', error);
            throw new HttpException('Error al crear el test', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async obtenerTestPorID(testID: number): Promise<Test | null> {
        const test = await this.testRepository.findOne({ where: { id_Test: testID } });
        if (!test) {
            throw new HttpException('Test no encontrado', HttpStatus.NOT_FOUND);
        }
        return test;
    }

    async obtenerTests(): Promise<Test[]> {
        return this.testRepository.find();
    }

    async actualizarTest(testID: number, test: ActualizarTestDto): Promise<Test> {
        const testExistente = await this.testRepository.findOne({ where: { id_Test: testID } });
        if (!testExistente) {
            throw new HttpException('Test no encontrado', HttpStatus.NOT_FOUND);
        }

        Object.assign(testExistente, test);

        try {
            return await this.testRepository.save(testExistente);
        } catch (error) {
            console.error('Error al actualizar el test:', error);
            throw new HttpException('Error al actualizar el test', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async eliminarTest(testID: number): Promise<void> {
        const testExistente = await this.testRepository.findOne({ where: { id_Test: testID } });
        if (!testExistente) {
            throw new HttpException('Test no encontrado', HttpStatus.NOT_FOUND);
        }

        try {
            await this.testRepository.remove(testExistente);
        } catch (error) {
            console.error('Error al eliminar el test:', error);
            throw new HttpException('Error al eliminar el test', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}