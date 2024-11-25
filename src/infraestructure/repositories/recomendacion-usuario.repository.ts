import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecomendacionUsuarioEntity } from '../database/recomendacion-usuario.entity.schema';
import { CrearRecomendacionUsuarioDto } from 'src/app/dtos/recomendacion-usuario/crear-recomendacion-usuario.dto';
import { RecomendacionUsuario } from 'src/core/domain/recomendacion-usuario/recomendacion-usuario.entity';
import { UsuarioEntity } from '../database/usuario.entity.schema';
import { RecomendacionEntity } from '../database/recomendacion.entity.schema';

@Injectable()
export class RecomendacionUsuarioRepositoryImpl {
  constructor(
    @InjectRepository(RecomendacionUsuarioEntity)
    private readonly recomendacionUsuarioRepository: Repository<RecomendacionUsuarioEntity>,

    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,

    @InjectRepository(RecomendacionEntity)
    private readonly recomendacionRepository: Repository<RecomendacionEntity>,
  ) {}

  async obtenerRecomendacionesUsuarioPorUsuarioID(usuarioID: number): Promise<RecomendacionUsuario[] | null> {
    const recomendacionesUsuario = await this.recomendacionUsuarioRepository.find({ 
      where: { usuario: { id_Usuario: usuarioID } } ,
      relations: ['recomendaciones'],
    });
    if (!recomendacionesUsuario) {
      throw new HttpException('Recomendación de usuario no encontrada', HttpStatus.NOT_FOUND);
    }
    return recomendacionesUsuario;
  }

  async crearRecomendacionUsuario(recomendacionUsuarioDto: CrearRecomendacionUsuarioDto): Promise<RecomendacionUsuario> {
    try {
      const usuarioId = Number(recomendacionUsuarioDto.usuarioId);
      if (isNaN(usuarioId)) {
        throw new HttpException('El usuarioId debe ser un número', HttpStatus.BAD_REQUEST);
      }

      const usuario = await this.usuarioRepository.findOne({ where: { id_Usuario: usuarioId } });
      if (!usuario) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      if (!Array.isArray(recomendacionUsuarioDto.recomendacion)) {
        throw new HttpException('Las recomendaciones deben ser un arreglo', HttpStatus.BAD_REQUEST);
      }

      const recomendaciones = await this.recomendacionRepository.findByIds(recomendacionUsuarioDto.recomendacion);

      const nuevaRecomendacionUsuario = new RecomendacionUsuarioEntity();
      nuevaRecomendacionUsuario.usuario = usuario;
      nuevaRecomendacionUsuario.recomendaciones = recomendaciones;

      const savedRecomendacionUsuario = await this.recomendacionUsuarioRepository.save(nuevaRecomendacionUsuario);
      return this.mapEntityToDomain(savedRecomendacionUsuario);
    } catch (error) {
      console.error('Error al guardar la nueva recomendación de usuario:', error);
      throw new HttpException('Error al crear la recomendación de usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async obtenerRecomendacionUsuarioPorID(recomendacionUsuarioID: number): Promise<RecomendacionUsuario | null> {
    const recomendacionUsuario = await this.recomendacionUsuarioRepository.findOne({ where: { id_RecomendacionUsuario: recomendacionUsuarioID } });
    if (!recomendacionUsuario) {
      throw new HttpException('Recomendación de usuario no encontrada', HttpStatus.NOT_FOUND);
    }
    return this.mapEntityToDomain(recomendacionUsuario);
  }

  async obtenerRecomendacionesUsuario(): Promise<RecomendacionUsuario[]> {
    const recomendacionesUsuarioEntities = await this.recomendacionUsuarioRepository.find();
    return recomendacionesUsuarioEntities;
  }

  async actualizarRecomendacionUsuario(recomendacionUsuarioID: number, recomendacionUsuarioDto: CrearRecomendacionUsuarioDto): Promise<RecomendacionUsuario> {
    const recomendacionUsuarioExistente = await this.recomendacionUsuarioRepository.findOne({ where: { id_RecomendacionUsuario: recomendacionUsuarioID } });
    if (!recomendacionUsuarioExistente) {
      throw new HttpException('Recomendación de usuario no encontrada', HttpStatus.NOT_FOUND);
    }

    // Convertir usuarioId a número
    const usuarioId = Number(recomendacionUsuarioDto.usuarioId);
    if (isNaN(usuarioId)) {
      throw new HttpException('El usuarioId debe ser un número', HttpStatus.BAD_REQUEST);
    }

    // Buscar la entidad UsuarioEntity por id
    const usuario = await this.usuarioRepository.findOne({ where: { id_Usuario: usuarioId } });
    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    // Verificar si recomendacion es un arreglo
    if (!Array.isArray(recomendacionUsuarioDto.recomendacion)) {
      throw new HttpException('Las recomendaciones deben ser un arreglo', HttpStatus.BAD_REQUEST);
    }

    // Buscar las entidades RecomendacionEntity por ids
    const recomendaciones = await this.recomendacionRepository.findByIds(recomendacionUsuarioDto.recomendacion);

    Object.assign(recomendacionUsuarioExistente, {
      usuario: usuario,
      recomendaciones: recomendaciones,
    });

    try {
      const updatedRecomendacionUsuario = await this.recomendacionUsuarioRepository.save(recomendacionUsuarioExistente);
      return this.mapEntityToDomain(updatedRecomendacionUsuario);
    } catch (error) {
      console.error('Error al actualizar la recomendación de usuario:', error);
      throw new HttpException('Error al actualizar la recomendación de usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Método de mapeo para convertir de entidad a dominio
  private mapEntityToDomain(entity: RecomendacionUsuarioEntity): RecomendacionUsuario {
    return {
      id_RecomendacionUsuario: entity.id_RecomendacionUsuario,
      usuario: entity.usuario,
      recomendaciones: entity.recomendaciones,
    };
  }
}
