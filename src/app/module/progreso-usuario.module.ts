import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgresoUsuarioController } from 'src/infraestructure/controllers/progreso-usuario.controller';
import { ProgresoUsuarioService } from 'src/app/services/progreso-usuario.service';
import { ProgresoUsuarioRepositoryImpl } from 'src/infraestructure/repositories/progreso-usuario.repository';
import { ProgresoUsuarioEntity } from 'src/infraestructure/database/progreso-usuario.entity.schema';
import { ProgresoUsuarioUseCase } from 'src/core/use-cases/progreso-usuario.use-case';
import { UsuarioEntity } from 'src/infraestructure/database/usuario.entity.schema';

@Module({
  imports: [TypeOrmModule.forFeature([ProgresoUsuarioEntity, UsuarioEntity]),
],
  controllers: [ProgresoUsuarioController],
  providers: [
    ProgresoUsuarioService,
    ProgresoUsuarioUseCase,
    {
      provide: 'ProgresoUsuarioRepository',
      useClass: ProgresoUsuarioRepositoryImpl,
    },
  ],
  exports: [ProgresoUsuarioService, ProgresoUsuarioUseCase],
})
export class ProgresoUsuarioModule {}
