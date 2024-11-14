import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgresoUsuarioController } from 'src/infraestructure/controllers/progreso-usuario.controller';
import { ProgresoUsuarioService } from 'src/app/services/progreso-usuario.service';
import { ProgresoUsuarioRepository } from 'src/infraestructure/repositories/progreso-usuario.repository';
import { ProgresoUsuarioEntity } from 'src/infraestructure/database/progreso-usuario.entity.schema';

@Module({
  imports: [TypeOrmModule.forFeature([ProgresoUsuarioEntity])],
  controllers: [ProgresoUsuarioController],
  providers: [
    ProgresoUsuarioService,
    {
      provide: 'ProgresoUsuarioRepository',
      useClass: ProgresoUsuarioRepository,
    },
  ],
  exports: [ProgresoUsuarioService],
})
export class ProgresoUsuarioModule {}