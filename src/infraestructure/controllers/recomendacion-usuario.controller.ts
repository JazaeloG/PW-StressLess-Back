import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RecomendacionUsuarioService } from '../../app/services/recomendacion-usuario.service';
import { RecomendacionUsuarioEntity } from '../../infraestructure/database/recomendacion-usuario.entity.schema';

@Controller('recomendacion-usuario')
export class RecomendacionUsuarioController {
  constructor(private readonly recomendacionUsuarioService: RecomendacionUsuarioService) {}

  @Post()
  create(@Body() recomendacionUsuario: RecomendacionUsuarioEntity): Promise<RecomendacionUsuarioEntity> {
    return this.recomendacionUsuarioService.create(recomendacionUsuario);
  }

  @Get()
  findAll(): Promise<RecomendacionUsuarioEntity[]> {
    return this.recomendacionUsuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<RecomendacionUsuarioEntity> {
    return this.recomendacionUsuarioService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() recomendacionUsuario: RecomendacionUsuarioEntity): Promise<void> {
    return this.recomendacionUsuarioService.update(id, recomendacionUsuario);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.recomendacionUsuarioService.remove(id);
  }
}