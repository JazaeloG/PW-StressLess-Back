import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecomendacionController } from 'src/infraestructure/controllers/recomendacion.controller';
import { RecomendacionService } from 'src/app/services/recomendacion.service';
import { RecomendacionRepositoryImpl } from 'src/infraestructure/repositories/recomendacion.repository';
import { RecomendacionEntity } from 'src/infraestructure/database/recomendacion.entity.schema';

@Module({
  imports: [TypeOrmModule.forFeature([RecomendacionEntity])],
  controllers: [RecomendacionController],
  providers: [
    RecomendacionService,
    {
      provide: 'RecomendacionRepository',
      useClass: RecomendacionRepositoryImpl,
    },
  ],
  exports: [RecomendacionService],
})
export class RecomendacionModule {}