import { UsuarioEntity } from "src/infraestructure/database/usuario.entity.schema";

export class ProgresoUsuario {
    id_ProgresoUsuario: number;
    usuario: UsuarioEntity;
    nivel_EstresAntes: number;
    nivel_EstresNuevo: number;
    progreso_Fecha: Date;
}
