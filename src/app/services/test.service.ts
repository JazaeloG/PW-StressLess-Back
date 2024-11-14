import { Injectable } from "@nestjs/common";
import { TestUseCase } from "src/core/use-cases/test.use-case";
import { TestInterface } from "src/shared/interfaces/test.interface";

@Injectable()
export class TestService {

    constructor(private readonly testUseCase: TestUseCase) {}

    async crearTest(test) {
        return this.testUseCase.crearTest(test);
    }

    async obtenerTests() {
        return this.testUseCase.obtenerTests();
    }

    async obtenerTestPorID(id_Test: number) {
        return this.testUseCase.obtenerTestPorID(id_Test);
    }

    async actualizarTest(id_Test: number, test) {
        return this.testUseCase.actualizarTest(id_Test, test);
    }

    async eliminarTest(id_Test: number) {
        return this.testUseCase.eliminarTest(id_Test);
    }

}