import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestController } from 'src/infraestructure/controllers/test.controller';
import { TestUseCase } from 'src/core/use-cases/test.use-case';
import { TestService } from 'src/app/services/test.service';
import { TestRepositoryImpl } from 'src/infraestructure/repositories/test.repository';
import { TestEntity } from 'src/infraestructure/database/test.entity.schema';

@Module({
  imports: [TypeOrmModule.forFeature([TestEntity])],
  controllers: [TestController],
  providers: [
    TestService,
    TestUseCase,
    {
      provide: 'TestRepository',
      useClass: TestRepositoryImpl,
    },
  ],
  exports: [TestUseCase, TestService],
})
export class TestModule {}