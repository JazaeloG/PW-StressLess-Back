import { Controller, Post, Body, Get, Delete, Param, Patch } from "@nestjs/common";
import { UsuarioUseCase } from "src/core/use-cases/usuario.use-case";
import { CrearUsuarioDto } from "src/app/dtos/usuarios/crear-usuario.dto";
import { ActualizarUsuarioDto } from "src/app/dtos/usuarios/actualizar-usuario.dto";

@Controller('usuarios')
export class UsuarioController {
    
    constructor(private readonly usuarioUseCase: UsuarioUseCase) {}

    @Post()
    async crearUsuario(@Body() usuario: CrearUsuarioDto) {
        return this.usuarioUseCase.crearUsuario(usuario);
    }

    @Get()
    async obtenerUsuarios() {
        return this.usuarioUseCase.obtenerUsuarios();
    }

    @Get('/:id_Usuario')
    async obtenerUsuarioPorID(@Param('id_Usuario') id_Usuario: number) {
        return this.usuarioUseCase.obtenerUsuarioPorID(id_Usuario);
    }

    @Get('/obtenerPorCorreo/:usuario_Correo')
    async obtenerUsuarioPorCorreo(@Param('usuario_Correo') usuario: string) {
        return this.usuarioUseCase.obtenerUsuarioPorCorreo(usuario);
    }

    @Patch(':id_Usuario')
    async actualizarUsuario(@Param('id_Usuario') id_Usuario: number, @Body() usuario: ActualizarUsuarioDto) {
        return this.usuarioUseCase.actualizarUsuario(id_Usuario, usuario);
    }

    @Delete(':id_Usuario')
    async eliminarUsuario(@Param('id_Usuario')id_Usuario: number) {
        return this.usuarioUseCase.eliminarUsuario(id_Usuario);
    }
}