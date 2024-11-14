import { TestResultado } from "./test-resultado.entity";
import { CrearTestResultadoDto } from "src/app/dtos/test-resultado/crear-test-resultado.dto";
import { ActualizarTestResultadoDto } from "src/app/dtos/test-resultado/actualizar-test-resultado.dto";

export interface TestResultadoRepository {
    crearTestResultado(testResultado: CrearTestResultadoDto): Promise<TestResultado>;
    obtenerTestResultadoPorID(testResultadoID: number): Promise<TestResultado | null>;
    obtenerTestResultados(): Promise<TestResultado[]>;
    actualizarTestResultado(testResultadoID: number, testResultado: ActualizarTestResultadoDto): Promise<TestResultado>;
    eliminarTestResultado(testResultadoID: number): Promise<void>;
}