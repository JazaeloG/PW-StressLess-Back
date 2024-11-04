import { ActualizarUsuarioDto } from "src/app/dtos/usuarios/actualizar-usuario.dto";
import { CrearUsuarioDto } from "src/app/dtos/usuarios/crear-usuario.dto";

export interface UsuarioRepository{
    crearUsuario(usuario: CrearUsuarioDto): Promise<any>;
    obtenerUsuarioPorID(usuarioID: number): Promise<any>;
    obtenerUsuarioPorCorreo(usuarioCorreo: string): Promise<any>;
    obtenerUsuarios(): Promise<any>;
    actualizarUsuario(usuarioID: number, usuario: ActualizarUsuarioDto): Promise<any>;
    eliminarUsuario(usuarioID: number): Promise<any>;
}