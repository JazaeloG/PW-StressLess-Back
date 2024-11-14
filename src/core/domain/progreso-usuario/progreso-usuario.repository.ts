import { ProgresoUsuario } from "./progreso-usuario.entity";
import { CrearProgresoUsuarioDto } from "src/app/dtos/progreso/crear-progreso.dto";
import { ActualizarProgresoUsuarioDto } from "src/app/dtos/progreso/actualizar-progreso.dto";

export interface ProgresoUsuarioRepository {
    crearProgresoUsuario(progresoUsuario: CrearProgresoUsuarioDto): Promise<ProgresoUsuario>;
    obtenerProgresoUsuarioPorID(progresoUsuarioID: number): Promise<ProgresoUsuario | null>;
    obtenerProgresoUsuarios(): Promise<ProgresoUsuario[]>;
    actualizarProgresoUsuario(progresoUsuarioID: number, progresoUsuario: ActualizarProgresoUsuarioDto): Promise<ProgresoUsuario>;
    eliminarProgresoUsuario(progresoUsuarioID: number): Promise<void>;
}