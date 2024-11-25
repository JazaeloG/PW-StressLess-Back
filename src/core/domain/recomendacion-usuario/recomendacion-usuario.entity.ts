import { RecomendacionEntity } from "src/infraestructure/database/recomendacion.entity.schema";
import { UsuarioEntity } from "src/infraestructure/database/usuario.entity.schema";

export class RecomendacionUsuario {
  id_RecomendacionUsuario: number; 
    usuario: UsuarioEntity; 
    recomendaciones: RecomendacionEntity[];
  }
  