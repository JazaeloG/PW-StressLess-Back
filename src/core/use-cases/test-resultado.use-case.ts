import { CrearTestResultadoDto } from "src/app/dtos/test-resultado/crear-test-resultado.dto";
import { Inject, Injectable } from "@nestjs/common";
import { TestResultadoRepository } from "../domain/test-resultado/test-resultado.repository";
import { TestResultado } from "../domain/test-resultado/test-resultado.entity";
import { ActualizarTestResultadoDto } from "src/app/dtos/test-resultado/actualizar-test-resultado.dto";

@Injectable()
export class TestResultadoUseCase {
    constructor(
        @Inject('TestResultadoRepository')
        private readonly testResultadoRepository: TestResultadoRepository,
    ) {}

    async crearTestResultado(testResultado: CrearTestResultadoDto): Promise<TestResultado> {
        return this.testResultadoRepository.crearTestResultado(testResultado);
    }

    async obtenerTestResultadoPorID(testResultadoID: number): Promise<TestResultado | null> {
        return this.testResultadoRepository.obtenerTestResultadoPorID(testResultadoID);
    }

    async obtenerTestResultados(): Promise<TestResultado[]> {
        return this.testResultadoRepository.obtenerTestResultados();
    }

    async actualizarTestResultado(testResultadoID: number, testResultado: ActualizarTestResultadoDto): Promise<TestResultado> {
        return this.testResultadoRepository.actualizarTestResultado(testResultadoID, testResultado);
    }

    async eliminarTestResultado(testResultadoID: number): Promise<void> {
        return this.testResultadoRepository.eliminarTestResultado(testResultadoID);
    }
}