import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreguntaService } from '../services/pregunta.service';
import { PreguntaUseCase } from 'src/core/use-cases/pregunta.use-case';
import { PreguntaRepositoryImpl } from 'src/infraestructure/repositories/pregunta.repository';
import { PreguntaEntity } from 'src/infraestructure/database/pregunta.entity.schema';

@Module({
  imports: [TypeOrmModule.forFeature([PreguntaEntity]),
  ],
  providers: [
    PreguntaService,
    PreguntaUseCase,
    {
      provide: 'PreguntaRepository',
      useClass: PreguntaRepositoryImpl,
    },
  ],
  exports: [PreguntaService,
    PreguntaUseCase,],
})
export class PreguntaModule {}