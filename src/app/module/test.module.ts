import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestController } from 'src/infraestructure/controllers/test.controller';
import { TestService } from 'src/app/services/test.service';
import { TestRepository } from 'src/infraestructure/repositories/test.repository';
import { TestEntity } from 'src/infraestructure/database/test.entity.schema';

@Module({
  imports: [TypeOrmModule.forFeature([TestEntity])],
  controllers: [TestController],
  providers: [
    TestService,
    {
      provide: 'TestRepository',
      useClass: TestRepository,
    },
  ],
  exports: [TestService],
})
export class TestModule {}