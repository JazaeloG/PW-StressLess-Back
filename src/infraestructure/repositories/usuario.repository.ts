import { UsuarioRepository } from "src/core/domain/usuario/usuario.repository";
import { Usuario } from "src/core/domain/usuario/usuario.entity";
import { CrearUsuarioDto } from "src/app/dtos/usuarios/crear-usuario.dto";
import { ActualizarUsuarioDto } from "src/app/dtos/usuarios/actualizar-usuario.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { UsuarioEntity } from "../database/usuario.entity.schema";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioRepositoryImpl implements UsuarioRepository {

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
    ) { }

    async crearUsuario(usuario: CrearUsuarioDto): Promise<Usuario> {
        const { usuario_Correo } = usuario;
    
        const usuarioExistente = await this.usuarioRepository.findOne({ where: { usuario_Correo } });
        if (usuarioExistente) {
            throw new HttpException('El correo ya está en uso', HttpStatus.BAD_REQUEST);
        }
        usuario.usuario_Password = await bcrypt.hash(usuario.usuario_Password, 10);
    
        try {
            const nuevoUsuario = this.usuarioRepository.create(usuario);
            return await this.usuarioRepository.save(nuevoUsuario);
        } catch (error) {
            throw new HttpException('Error al crear el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    async obtenerUsuarioPorID(usuarioID: number): Promise<Usuario | null> {
        const usuario = await this.usuarioRepository.findOne({ where: { id_Usuario: usuarioID } });
        if (!usuario) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }
        return usuario;
    }
    
    async obtenerUsuarioPorCorreo(usuarioCorreo: string): Promise<Usuario | null> {
        const usuario = await this.usuarioRepository.findOne({ where: { usuario_Correo: usuarioCorreo } });
        if (!usuario) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }
        return usuario;
    }
    
    async obtenerUsuarios(): Promise<Usuario[]> {
        return await this.usuarioRepository.find();
    }
    
    async actualizarUsuario(usuarioID: number, usuario: ActualizarUsuarioDto): Promise<Usuario> {
        const usuarioExistente = await this.usuarioRepository.findOne({ where: { id_Usuario: usuarioID } });
        if (!usuarioExistente) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }
    
        try {
            await this.usuarioRepository.update(usuarioID, usuario);
            return await this.usuarioRepository.findOne({ where: { id_Usuario: usuarioID } });
        } catch (error) {
            throw new HttpException('Error al actualizar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    async eliminarUsuario(usuarioID: number): Promise<void> {
        const usuarioExistente = await this.usuarioRepository.findOne({ where: { id_Usuario: usuarioID } });
        if (!usuarioExistente) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }
    
        try {
            await this.usuarioRepository.delete(usuarioID);
        } catch (error) {
            throw new HttpException('Error al eliminar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

}