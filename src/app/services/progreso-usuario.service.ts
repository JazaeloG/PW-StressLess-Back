import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgresoUsuarioRepository } from '../../infraestructure/repositories/progreso-usuario.repository';
import { ProgresoUsuarioEntity } from '../../infraestructure/database/progreso-usuario.entity.schema';

@Injectable()
export class ProgresoUsuarioService {
  constructor(
    @InjectRepository(ProgresoUsuarioRepository)
    private readonly progresoUsuarioRepository: ProgresoUsuarioRepository,
  ) {}

  async create(progresoUsuario: ProgresoUsuarioEntity): Promise<ProgresoUsuarioEntity> {
    return this.progresoUsuarioRepository.save(progresoUsuario);
  }

  async findAll(): Promise<ProgresoUsuarioEntity[]> {
    return this.progresoUsuarioRepository.find();
  }

  async findOne(id: number): Promise<ProgresoUsuarioEntity> {
    return this.progresoUsuarioRepository.findOne({ where: { id_ProgresoUsuario: id } });
  }

  async update(id: number, progresoUsuario: ProgresoUsuarioEntity): Promise<void> {
    await this.progresoUsuarioRepository.update(id, progresoUsuario);
  }

  async remove(id: number): Promise<void> {
    await this.progresoUsuarioRepository.delete(id);
  }
}