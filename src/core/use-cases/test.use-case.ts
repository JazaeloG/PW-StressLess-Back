import { CrearTestDto } from "src/app/dtos/test/crear-test.dto";
import { Inject, Injectable } from "@nestjs/common";
import { TestRepository } from "../domain/test/test.repository";
import { Test } from "../domain/test/test.entity";
import { ActualizarTestDto } from "src/app/dtos/test/actualizar-test.dto";

@Injectable()
export class TestUseCase {
    constructor(
        @Inject('TestRepository')
        private readonly testRepository: TestRepository,
    ) {}

    async crearTest(test: CrearTestDto): Promise<Test> {
        return this.testRepository.crearTest(test);
    }

    async obtenerTestPorID(testID: number): Promise<Test | null> {
        return this.testRepository.obtenerTestPorID(testID);
    }

    async obtenerTests(): Promise<Test[]> {
        return this.testRepository.obtenerTests();
    }

    async actualizarTest(testID: number, test: ActualizarTestDto): Promise<Test> {
        return this.testRepository.actualizarTest(testID, test);
    }

    async eliminarTest(testID: number): Promise<void> {
        return this.testRepository.eliminarTest(testID);
    }
}