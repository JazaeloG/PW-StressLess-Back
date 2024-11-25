import { TestRepository } from "src/core/domain/test/test.repository";
import { Test } from "src/core/domain/test/test.entity";
import { CrearTestDto } from "src/app/dtos/test/crear-test.dto";
import { ActualizarTestDto } from "src/app/dtos/test/actualizar-test.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository, DeepPartial } from 'typeorm';
import { TestEntity } from "../database/test.entity.schema";
import { PreguntaEntity } from "../database/pregunta.entity.schema";

@Injectable()
export class TestRepositoryImpl implements TestRepository {

    constructor(
        @InjectRepository(TestEntity)
        private readonly testRepository: Repository<TestEntity>,

        @InjectRepository(PreguntaEntity)
        private readonly preguntaRepository: Repository<PreguntaEntity>,
    ) { }

    async crearTest(testDto: CrearTestDto): Promise<Test> {
        try {
            const preguntasEntities = await Promise.all(
                testDto.preguntas.map(async (preguntaDto) => {
                    const pregunta = this.preguntaRepository.create({
                        pregunta_Texto: preguntaDto.pregunta_Texto,
                    });
                    return this.preguntaRepository.save(pregunta);
                }),
            );
    
            // Crear el test con las preguntas asociadas
            const nuevoTest: DeepPartial<TestEntity> = {
                test_Nombre: testDto.test_Nombre,
                test_Descripcion: testDto.test_Descripcion,
                preguntas: preguntasEntities, 
            };
    
            const testEntity = this.testRepository.create(nuevoTest);
            const savedTest = await this.testRepository.save(testEntity);
    
            return this.mapEntityToDomain(savedTest);
        } catch (error) {
            console.error('Error al crear el test:', error);
            throw new HttpException('Error al crear el test', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async obtenerTestPorID(testID: number): Promise<Test | null> {
        const testEntity = await this.testRepository.findOne({
            where: { id_Test: testID },
            relations: ['preguntas'],
        });
    
        if (!testEntity) {
            throw new HttpException('Test no encontrado', HttpStatus.NOT_FOUND);
        }
    
        return testEntity;
    }

    async obtenerTests(): Promise<Test[]> {
        const testEntities = await this.testRepository.find({
            relations: ['preguntas'],
        });
        return testEntities;
    }

    async actualizarTest(testID: number, testDto: ActualizarTestDto): Promise<Test> {
        const testExistente = await this.testRepository.findOne({ where: { id_Test: testID } });
        if (!testExistente) {
            throw new HttpException('Test no encontrado', HttpStatus.NOT_FOUND);
        }

        Object.assign(testExistente, {
            test_Nombre: testDto.test_Nombre,
            test_Descripcion: testDto.test_Descripcion,
            test_FechaCreacion: testDto.test_FechaCreacion,
        });

        try {
            const updatedTest = await this.testRepository.save(testExistente);
            return this.mapEntityToDomain(updatedTest);
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

    // Método de mapeo para convertir de entidad a dominio
    private mapEntityToDomain(entity: TestEntity): Test {
        return {
            id_Test: entity.id_Test,
            test_Nombre: entity.test_Nombre,
            test_Descripcion: entity.test_Descripcion,
            test_FechaCreacion: entity.test_FechaCreacion,
        };
    }
}
