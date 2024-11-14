import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestRepository } from '../../infraestructure/repositories/test.repository';
import { TestEntity } from '../../infraestructure/database/test.entity.schema';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(TestRepository)
    private readonly testRepository: TestRepository,
  ) {}

  async create(test: TestEntity): Promise<TestEntity> {
    return this.testRepository.save(test);
  }

  async findAll(): Promise<TestEntity[]> {
    return this.testRepository.find();
  }

  async findOne(id: number): Promise<TestEntity> {
    return this.testRepository.findOne({ where: { id_Test: id } });
  }

  async update(id: number, test: TestEntity): Promise<void> {
    await this.testRepository.update(id, test);
  }

  async remove(id: number): Promise<void> {
    await this.testRepository.delete(id);
  }
}