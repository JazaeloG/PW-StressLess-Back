import { EntityRepository, Repository } from 'typeorm';
import { TestEntity } from '../database/test.entity.schema';

@EntityRepository(TestEntity)
export class TestRepository extends Repository<TestEntity> {}