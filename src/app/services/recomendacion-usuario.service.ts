import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecomendacionUsuarioRepository } from '../../infraestructure/repositories/recomendacion-usuario.repository';
import { RecomendacionUsuarioEntity } from '../../infraestructure/database/recomendacion-usuario.entity.schema';

@Injectable()
export class RecomendacionUsuarioService {
  constructor(
    @InjectRepository(RecomendacionUsuarioRepository)
    private readonly recomendacionUsuarioRepository: RecomendacionUsuarioRepository,
  ) {}

  async create(recomendacionUsuario: RecomendacionUsuarioEntity): Promise<RecomendacionUsuarioEntity> {
    return this.recomendacionUsuarioRepository.save(recomendacionUsuario);
  }

  async findAll(): Promise<RecomendacionUsuarioEntity[]> {
    return this.recomendacionUsuarioRepository.find();
  }

  async findOne(id: number): Promise<RecomendacionUsuarioEntity> {
    return this.recomendacionUsuarioRepository.findOne({ where: { id_RecomendacionUsuario: id } });
  }

  async update(id: number, recomendacionUsuario: RecomendacionUsuarioEntity): Promise<void> {
    await this.recomendacionUsuarioRepository.update(id, recomendacionUsuario);
  }

  async remove(id: number): Promise<void> {
    await this.recomendacionUsuarioRepository.delete(id);
  }
}