import { EntityRepository, Repository } from 'typeorm';
import { RecomendacionEntity } from '../database/recomendacion.entity.schema';

@EntityRepository(RecomendacionEntity)
export class RecomendacionRepository extends Repository<RecomendacionEntity> {}