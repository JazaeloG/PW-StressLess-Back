import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get(':id')
  async obtenerUsuario(@Param('id') id: number): Promise<Usuario> {
    return this.usuarioService.obtenerUsuarioPorId(id);
  }

  @Get()
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Usuario> {
    return this.usuarioService.findOne(Number(id));
  }

  @Post()
  create(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.create(usuario);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.update(Number(id), usuario);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.usuarioService.delete(Number(id));
  }
}
