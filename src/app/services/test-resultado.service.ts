import { Injectable } from "@nestjs/common";
import { TestResultadoUseCase } from "src/core/use-cases/test-resultado.use-case";
import { TestResultadoInterface } from "src/shared/interfaces/test-resultado.interface";

@Injectable()
export class TestResultadoService {

    constructor(private readonly testResultadoUseCase: TestResultadoUseCase) {}

    async crearTestResultado(testResultado) {
        return this.testResultadoUseCase.crearTestResultado(testResultado);
    }

    async obtenerTestResultados() {
        return this.testResultadoUseCase.obtenerTestResultados();
    }

    async obtenerTestResultadoPorID(id_TestResultado: number) {
        return this.testResultadoUseCase.obtenerTestResultadoPorID(id_TestResultado);
    }

    async actualizarTestResultado(id_TestResultado: number, testResultado) {
        return this.testResultadoUseCase.actualizarTestResultado(id_TestResultado, testResultado);
    }

    async eliminarTestResultado(id_TestResultado: number) {
        return this.testResultadoUseCase.eliminarTestResultado(id_TestResultado);
    }

}