import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProgresoUsuarioService } from '../../app/services/progreso-usuario.service';
import { ProgresoUsuarioEntity } from '../database/progreso-usuario.entity.schema';

@Controller('progreso-usuario')
export class ProgresoUsuarioController {
  constructor(private readonly progresoUsuarioService: ProgresoUsuarioService) {}

  @Post()
  create(@Body() progresoUsuario: ProgresoUsuarioEntity): Promise<ProgresoUsuarioEntity> {
    return this.progresoUsuarioService.create(progresoUsuario);
  }

  @Get()
  findAll(): Promise<ProgresoUsuarioEntity[]> {
    return this.progresoUsuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ProgresoUsuarioEntity> {
    return this.progresoUsuarioService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() progresoUsuario: ProgresoUsuarioEntity): Promise<void> {
    return this.progresoUsuarioService.update(id, progresoUsuario);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.progresoUsuarioService.remove(id);
  }
}