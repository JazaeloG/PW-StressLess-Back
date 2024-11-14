import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecomendacionRepository } from '../../infraestructure/repositories/recomendacion.repository';
import { RecomendacionEntity } from '../../infraestructure/database/recomendacion.entity.schema';

@Injectable()
export class RecomendacionService {
  constructor(
    @InjectRepository(RecomendacionRepository)
    private readonly recomendacionRepository: RecomendacionRepository,
  ) {}

  async create(recomendacion: RecomendacionEntity): Promise<RecomendacionEntity> {
    return this.recomendacionRepository.save(recomendacion);
  }

  async findAll(): Promise<RecomendacionEntity[]> {
    return this.recomendacionRepository.find();
  }

  async findOne(id: number): Promise<RecomendacionEntity> {
    return this.recomendacionRepository.findOne({ where: { id_Recomendacion: id } });
  }

  async update(id: number, recomendacion: RecomendacionEntity): Promise<void> {
    await this.recomendacionRepository.update(id, recomendacion);
  }

  async remove(id: number): Promise<void> {
    await this.recomendacionRepository.delete(id);
  }
}