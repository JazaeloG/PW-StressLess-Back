import { Controller, Post, Body, Get, Delete, Param, Patch } from "@nestjs/common";
import { RecomendacionUsuarioService } from "../../app/services/recomendacion-usuario.service";
import { CrearRecomendacionUsuarioDto } from "src/app/dtos/recomendacion-usuario/crear-recomendacion-usuario.dto";
import { ActualizarRecomendacionUsuarioDto } from "src/app/dtos/recomendacion-usuario/actualizar-recomendacion-usuario.dto";

@Controller('recomendacion-usuario')
export class RecomendacionUsuarioController {
    
    constructor(private readonly recomendacionUsuarioService: RecomendacionUsuarioService) {}

    @Post()
    async crearRecomendacionUsuario(@Body() recomendacionUsuario: CrearRecomendacionUsuarioDto) {
        return this.recomendacionUsuarioService.crearRecomendacionUsuario(recomendacionUsuario);
    }

    @Get('/:idUsuario')
    async obtenerRecomendacionesUsuarioPorUsuarioID(@Param('idUsuario') idUsuario: number) {
        return this.recomendacionUsuarioService.obtenerRecomendacionesUsuarioPorUsuarioID(idUsuario);
    }

    @Get()
    async obtenerRecomendacionesUsuario() {
        return this.recomendacionUsuarioService.obtenerRecomendacionUsuarios();
    }

    @Get('/:id')
    async obtenerRecomendacionUsuarioPorID(@Param('id') id: number) {
        return this.recomendacionUsuarioService.obtenerRecomendacionUsuarioPorID(id);
    }

    @Patch('/:id')
    async actualizarRecomendacionUsuario(@Param('id') id: number, @Body() recomendacionUsuario: ActualizarRecomendacionUsuarioDto) {
        return this.recomendacionUsuarioService.actualizarRecomendacionUsuario(id, recomendacionUsuario);
    }

    @Delete('/:id')
    async eliminarRecomendacionUsuario(@Param('id') id: number) {
        return this.recomendacionUsuarioService.eliminarRecomendacionUsuario(id);
    }
}