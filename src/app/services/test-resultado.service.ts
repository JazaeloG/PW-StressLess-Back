import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestResultadoRepository } from '../../infraestructure/repositories/test-resultado.repository';
import { TestResultadoEntity } from '../../infraestructure/database/test-resultado.entity.schema';

@Injectable()
export class TestResultadoService {
  constructor(
    @InjectRepository(TestResultadoRepository)
    private readonly testResultadoRepository: TestResultadoRepository,
  ) {}

  async create(testResultado: TestResultadoEntity): Promise<TestResultadoEntity> {
    return this.testResultadoRepository.save(testResultado);
  }

  async findAll(): Promise<TestResultadoEntity[]> {
    return this.testResultadoRepository.find();
  }

  async findOne(id: number): Promise<TestResultadoEntity> {
    return this.testResultadoRepository.findOne({ where: { id_TestResultado: id } });
  }

  async update(id: number, testResultado: TestResultadoEntity): Promise<void> {
    await this.testResultadoRepository.update(id, testResultado);
  }

  async remove(id: number): Promise<void> {
    await this.testResultadoRepository.delete(id);
  }
}