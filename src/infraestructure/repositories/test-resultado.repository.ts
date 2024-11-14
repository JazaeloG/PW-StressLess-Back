import { EntityRepository, Repository } from 'typeorm';
import { TestResultadoEntity } from '../database/test-resultado.entity.schema';

@EntityRepository(TestResultadoEntity)
export class TestResultadoRepository extends Repository<TestResultadoEntity> {}