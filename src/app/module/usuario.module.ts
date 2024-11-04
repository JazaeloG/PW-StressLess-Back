import { Module } from '@nestjs/common';
import { UsuarioController } from 'src/infraestructure/controllers/usuario.controller';
import { UsuarioUseCase } from 'src/core/use-cases/usuario.use-case';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioRepositoryImpl } from 'src/infraestructure/repositories/usuario.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/infraestructure/database/usuario.entity.schema';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  controllers: [UsuarioController],
  providers: [
    UsuarioService,
    UsuarioUseCase,
    {
      provide: 'UsuarioRepository',
      useClass: UsuarioRepositoryImpl,
    },
  ],
  exports: [UsuarioUseCase, UsuarioService],
})
export class UsuarioModule {}