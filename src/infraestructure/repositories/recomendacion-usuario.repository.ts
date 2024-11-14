import { EntityRepository, Repository } from 'typeorm';
import { RecomendacionUsuarioEntity } from '../database/recomendacion-usuario.entity.schema';

@EntityRepository(RecomendacionUsuarioEntity)
export class RecomendacionUsuarioRepository extends Repository<RecomendacionUsuarioEntity> {}