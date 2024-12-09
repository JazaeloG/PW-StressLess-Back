import { LoginUsuarioDto } from "src/app/dtos/login/login.dto";
import { CrearUsuarioDto } from "src/app/dtos/usuarios/crear-usuario.dto";

export interface AuthRepository{
    registrarUsuario(usuario: CrearUsuarioDto): Promise<any>;
    login(usuario: LoginUsuarioDto): Promise<any>;
    obtenerPorToken(token: string): Promise<any>;
}