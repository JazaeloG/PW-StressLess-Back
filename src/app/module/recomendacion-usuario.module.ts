import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecomendacionUsuarioController } from 'src/infraestructure/controllers/recomendacion-usuario.controller';
import { RecomendacionUsuarioService } from 'src/app/services/recomendacion-usuario.service';
import { RecomendacionUsuarioRepository } from 'src/infraestructure/repositories/recomendacion-usuario.repository';
import { RecomendacionUsuarioEntity } from 'src/infraestructure/database/recomendacion-usuario.entity.schema';

@Module({
  imports: [TypeOrmModule.forFeature([RecomendacionUsuarioEntity])],
  controllers: [RecomendacionUsuarioController],
  providers: [
    RecomendacionUsuarioService,
    {
      provide: 'RecomendacionUsuarioRepository',
      useClass: RecomendacionUsuarioRepository,
    },
  ],
  exports: [RecomendacionUsuarioService],
})
export class RecomendacionUsuarioModule {}