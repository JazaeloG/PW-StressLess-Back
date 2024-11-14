import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecomendacionUsuarioController } from 'src/infraestructure/controllers/recomendacion-usuario.controller';
import { RecomendacionUsuarioUseCase } from 'src/core/use-cases/recomendacion-usuario.use-case';
import { RecomendacionUsuarioService } from 'src/app/services/recomendacion-usuario.service';
import { RecomendacionUsuarioRepositoryImpl } from 'src/infraestructure/repositories/recomendacion-usuario.repository';
import { RecomendacionUsuarioEntity } from 'src/infraestructure/database/recomendacion-usuario.entity.schema';
import { UsuarioEntity } from 'src/infraestructure/database/usuario.entity.schema';
import { RecomendacionEntity } from 'src/infraestructure/database/recomendacion.entity.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecomendacionUsuarioEntity, UsuarioEntity, RecomendacionEntity]),
  ],
  controllers: [RecomendacionUsuarioController],
  providers: [
    RecomendacionUsuarioService,
    RecomendacionUsuarioUseCase,
    {
      provide: 'RecomendacionUsuarioRepository',
      useClass: RecomendacionUsuarioRepositoryImpl,
    },
  ],
  exports: [RecomendacionUsuarioUseCase, RecomendacionUsuarioService],
})
export class RecomendacionUsuarioModule {}
