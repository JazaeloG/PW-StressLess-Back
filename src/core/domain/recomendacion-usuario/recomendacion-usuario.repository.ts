import { RecomendacionUsuario } from "./recomendacion-usuario.entity";
import { CrearRecomendacionUsuarioDto } from "src/app/dtos/recomendacion-usuario/crear-recomendacion-usuario.dto";
import { ActualizarRecomendacionUsuarioDto } from "src/app/dtos/recomendacion-usuario/actualizar-recomendacion-usuario.dto";

export interface RecomendacionUsuarioRepository {
    crearRecomendacionUsuario(recomendacionUsuario: CrearRecomendacionUsuarioDto): Promise<RecomendacionUsuario>;
    obtenerRecomendacionUsuarioPorID(recomendacionUsuarioID: number): Promise<RecomendacionUsuario | null>;
    obtenerRecomendacionUsuarios(): Promise<RecomendacionUsuario[]>;
    actualizarRecomendacionUsuario(recomendacionUsuarioID: number, recomendacionUsuario: ActualizarRecomendacionUsuarioDto): Promise<RecomendacionUsuario>;
    eliminarRecomendacionUsuario(recomendacionUsuarioID: number): Promise<void>;
}