import { TestEntity } from "src/infraestructure/database/test.entity.schema";
import { UsuarioEntity } from "src/infraestructure/database/usuario.entity.schema";

export class TestResultado {
    id_TestResultado: number;
    usuario: UsuarioEntity;
    test: TestEntity;
    testResultado_Puntaje: number;
    testResultado_Comentarios: string;
    testResultado_Fecha: Date;
}
