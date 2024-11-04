import { CrearUsuarioDto } from "src/app/dtos/usuarios/crear-usuario.dto";
import { Inject, Injectable } from "@nestjs/common";
import { UsuarioRepository } from "../domain/usuario/usuario.repository";
import { Usuario } from "../domain/usuario/usuario.entity";
import { UsuarioInterface } from "src/shared/interfaces/usuario.interface";
import { ActualizarUsuarioDto } from "src/app/dtos/usuarios/actualizar-usuario.dto";


@Injectable()
export class UsuarioUseCase {

    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
    ) {}

    async crearUsuario(usuario: CrearUsuarioDto): Promise<Usuario> {
        return this.usuarioRepository.crearUsuario(usuario);
    }

    async obtenerUsuarioPorID(usuarioID: number): Promise<Usuario | null> {
        return this.usuarioRepository.obtenerUsuarioPorID(usuarioID);
    }

    async obtenerUsuarioPorUsuario(usuarioUsuario: string): Promise<Usuario | null> {
        return this.usuarioRepository.obtenerUsuarioPorUsuario(usuarioUsuario);
    }

    async obtenerUsuarios(): Promise<Usuario[]> {
        return this.usuarioRepository.obtenerUsuarios();
    }

    async actualizarUsuario(usuarioID: number, usuario: ActualizarUsuarioDto): Promise<Usuario> {
        return this.usuarioRepository.actualizarUsuario(usuarioID, usuario);
    }

    async eliminarUsuario(usuarioID: number): Promise<void> {
        return this.usuarioRepository.eliminarUsuario(usuarioID);
    }
}