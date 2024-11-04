import { Injectable } from "@nestjs/common";
import { UsuarioUseCase } from "src/core/use-cases/usuario.use-case";
import { UsuarioInterface } from "src/shared/interfaces/usuario.interface";

@Injectable()
export class UsuarioService {

    constructor(private readonly usuarioUseCase: UsuarioUseCase) {}

    async crearUsuario(usuario) {
        return this.usuarioUseCase.crearUsuario(usuario);
    }

    async obtenerUsuarios() {
        return this.usuarioUseCase.obtenerUsuarios();
    }

    async obtenerUsuarioPorID(id_Usuario: number) {
        return this.usuarioUseCase.obtenerUsuarioPorID(id_Usuario);
    }

    async obtenerUsuarioPorUsuario(usuarioUsuario: string) {
        return this.usuarioUseCase.obtenerUsuarioPorUsuario(usuarioUsuario);
    }

    async actualizarUsuario(id_Usuario: number, usuario) {
        return this.usuarioUseCase.actualizarUsuario(id_Usuario, usuario);
    }

    async eliminarUsuario(id_Usuario: number) {
        return this.usuarioUseCase.eliminarUsuario(id_Usuario);
    }

}