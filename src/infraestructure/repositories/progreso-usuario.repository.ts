import { EntityRepository, Repository } from 'typeorm';
import { ProgresoUsuarioEntity } from '../database/progreso-usuario.entity.schema';

@EntityRepository(ProgresoUsuarioEntity)
export class ProgresoUsuarioRepository extends Repository<ProgresoUsuarioEntity> {
  
  async findByNivelEstresAntes(nivel: number): Promise<ProgresoUsuarioEntity[]> {
    return this.find({ where: { nivel_EstresAntes: nivel } });
  }

  async findByNivelEstresNuevo(nivel: number): Promise<ProgresoUsuarioEntity[]> {
    return this.find({ where: { nivel_EstresNuevo: nivel } });
  }

  async findByProgresoFecha(fecha: Date): Promise<ProgresoUsuarioEntity[]> {
    return this.find({ where: { progreso_Fecha: fecha } });
  }
}