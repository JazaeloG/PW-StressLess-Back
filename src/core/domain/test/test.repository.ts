import { Test } from "./test.entity";
import { CrearTestDto } from "src/app/dtos/test/crear-test.dto";
import { ActualizarTestDto } from "src/app/dtos/test/actualizar-test.dto";

export interface TestRepository {
    crearTest(test: CrearTestDto): Promise<Test>;
    obtenerTestPorID(testID: number): Promise<Test | null>;
    obtenerTests(): Promise<Test[]>;
    actualizarTest(testID: number, test: ActualizarTestDto): Promise<Test>;
    eliminarTest(testID: number): Promise<void>;
}