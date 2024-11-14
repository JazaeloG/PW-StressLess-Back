import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestResultadoController } from 'src/infraestructure/controllers/test-resultado.controller';
import { TestResultadoUseCase } from 'src/core/use-cases/test-resultado.use-case';
import { TestResultadoService } from 'src/app/services/test-resultado.service';
import { TestResultadoRepositoryImpl } from 'src/infraestructure/repositories/test-resultado.repository';
import { TestResultadoEntity } from 'src/infraestructure/database/test-resultado.entity.schema';

@Module({
  imports: [TypeOrmModule.forFeature([TestResultadoEntity])],
  controllers: [TestResultadoController],
  providers: [
    TestResultadoService,
    TestResultadoUseCase,
    {
      provide: 'TestResultadoRepository',
      useClass: TestResultadoRepositoryImpl,
    },
  ],
  exports: [TestResultadoUseCase, TestResultadoService],
})
export class TestResultadoModule {}