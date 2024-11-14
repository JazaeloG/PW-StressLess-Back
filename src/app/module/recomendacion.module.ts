import { Module } from '@nestjs/common';
import { RecomendacionController } from 'src/infraestructure/controllers/recomendacion.controller';
import { RecomendacionUseCase } from 'src/core/use-cases/recomendacion.use-case';
import { RecomendacionService } from 'src/app/services/recomendacion.service';
import { RecomendacionRepositoryImpl } from 'src/infraestructure/repositories/recomendacion.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecomendacionEntity } from 'src/infraestructure/database/recomendacion.entity.schema';

@Module({
  imports: [TypeOrmModule.forFeature([RecomendacionEntity])],
  controllers: [RecomendacionController],
  providers: [
    RecomendacionService,
    RecomendacionUseCase,
    {
      provide: 'RecomendacionRepository',
      useClass: RecomendacionRepositoryImpl,
    },
  ],
  exports: [RecomendacionUseCase, RecomendacionService],
})
export class RecomendacionModule {}