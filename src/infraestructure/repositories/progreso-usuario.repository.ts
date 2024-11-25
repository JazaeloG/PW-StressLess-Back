import { ProgresoUsuarioRepository } from "src/core/domain/progreso-usuario/progreso-usuario.repository";
import { ProgresoUsuario } from "src/core/domain/progreso-usuario/progreso-usuario.entity";
import { CrearProgresoUsuarioDto } from "src/app/dtos/progreso/crear-progreso.dto";
import { ActualizarProgresoUsuarioDto } from "src/app/dtos/progreso/actualizar-progreso.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository, DeepPartial, In } from 'typeorm';
import { ProgresoUsuarioEntity } from "../database/progreso-usuario.entity.schema";
import { UsuarioEntity } from "../database/usuario.entity.schema";

@Injectable()
export class ProgresoUsuarioRepositoryImpl implements ProgresoUsuarioRepository {

    constructor(
        @InjectRepository(ProgresoUsuarioEntity)
        private readonly progresoUsuarioRepository: Repository<ProgresoUsuarioEntity>,

        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
    ) {}

    async crearProgresoUsuario(progresoUsuario: CrearProgresoUsuarioDto): Promise<ProgresoUsuario> {
        try {

            const usuario = await this.usuarioRepository.findOne({ where: { id_Usuario: progresoUsuario.usuarioId } });
            const nuevoProgresoUsuario = {
                usuario: usuario,
                nivel_EstresAntes: progresoUsuario.nivelEstresAntes,
                nivel_EstresNuevo: progresoUsuario.nivelEstresNuevo,
                progreso_Fecha: new Date(),
            };
            const progresoEntity = this.progresoUsuarioRepository.create(nuevoProgresoUsuario);
            const savedProgresoUsuario = await this.progresoUsuarioRepository.save(progresoEntity);
            return savedProgresoUsuario;
        } catch (error) {
            console.error('Error al guardar el nuevo progreso de usuario:', error);
            throw new HttpException('Error al crear el progreso de usuario', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async obtenerProgresoUsuarioPorID(progresoUsuarioID: number): Promise<ProgresoUsuario | null> {
        const progresoUsuario = await this.progresoUsuarioRepository.findOne({ where: { id_ProgresoUsuario: progresoUsuarioID } });
        if (!progresoUsuario) {
            throw new HttpException('Progreso de usuario no encontrado', HttpStatus.NOT_FOUND);
        }
        return progresoUsuario;
    }

    async obtenerProgresoUsuarios(): Promise<ProgresoUsuario[]> {
        const progresosUsuarioEntities = await this.progresoUsuarioRepository.find({
            relations: ['usuario'],
        });
        return progresosUsuarioEntities;
    }

    async actualizarProgresoUsuario(progresoUsuarioID: number, progresoUsuario: ActualizarProgresoUsuarioDto): Promise<ProgresoUsuario> {
        const progresoUsuarioExistente = await this.progresoUsuarioRepository.findOne({ where: { id_ProgresoUsuario: progresoUsuarioID } });
        if (!progresoUsuarioExistente) {
            throw new HttpException('Progreso de usuario no encontrado', HttpStatus.NOT_FOUND);
        }

        Object.assign(progresoUsuarioExistente, progresoUsuario);

        try {
            const updatedProgresoUsuario = await this.progresoUsuarioRepository.save(progresoUsuarioExistente);
            return updatedProgresoUsuario;
        } catch (error) {
            console.error('Error al actualizar el progreso de usuario:', error);
            throw new HttpException('Error al actualizar el progreso de usuario', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async progresosUsuarioPorIDUsuario(usuarioID: number): Promise<ProgresoUsuario[]> {
        const progresosUsuario = await this.progresoUsuarioRepository.find({ where: { usuario: { id_Usuario: usuarioID } } });
        return progresosUsuario;
    }

    async eliminarProgresoUsuario(progresoUsuarioID: number): Promise<void> {
        const progresoUsuarioExistente = await this.progresoUsuarioRepository.findOne({ where: { id_ProgresoUsuario: progresoUsuarioID } });
        if (!progresoUsuarioExistente) {
            throw new HttpException('Progreso de usuario no encontrado', HttpStatus.NOT_FOUND);
        }

        try {
            await this.progresoUsuarioRepository.remove(progresoUsuarioExistente);
        } catch (error) {
            console.error('Error al eliminar el progreso de usuario:', error);
            throw new HttpException('Error al eliminar el progreso de usuario', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
