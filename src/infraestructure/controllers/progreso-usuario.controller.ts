import { Controller, Post, Body, Get, Delete, Param, Patch } from "@nestjs/common";
import { ProgresoUsuarioUseCase } from "src/core/use-cases/progreso-usuario.use-case";
import { CrearProgresoUsuarioDto } from "src/app/dtos/progreso/crear-progreso.dto";
import { ActualizarProgresoUsuarioDto } from "src/app/dtos/progreso/actualizar-progreso.dto";

@Controller('progreso-usuario')
export class ProgresoUsuarioController {
    
    constructor(private readonly progresoUsuarioUseCase: ProgresoUsuarioUseCase) {}

    @Post()
    async crearProgresoUsuario(@Body() progresoUsuario: CrearProgresoUsuarioDto) {
        return this.progresoUsuarioUseCase.crearProgresoUsuario(progresoUsuario);
    }

    @Get('/:id_Usuario')
    async obtenerProgresosUsuarioPorUsuario(@Param('id_Usuario') id_Usuario: number) {
        return this.progresoUsuarioUseCase.progresosUsuarioPorIDUsuario(id_Usuario);
    }

    @Get()
    async obtenerProgresosUsuario() {
        return this.progresoUsuarioUseCase.obtenerProgresoUsuarios();
    }

    @Get('/:id_ProgresoUsuario')
    async obtenerProgresoUsuarioPorID(@Param('id_ProgresoUsuario') id_ProgresoUsuario: number) {
        return this.progresoUsuarioUseCase.obtenerProgresoUsuarioPorID(id_ProgresoUsuario);
    }

    @Patch('/:id_ProgresoUsuario')
    async actualizarProgresoUsuario(@Param('id_ProgresoUsuario') id_ProgresoUsuario: number, @Body() progresoUsuario: ActualizarProgresoUsuarioDto) {
        return this.progresoUsuarioUseCase.actualizarProgresoUsuario(id_ProgresoUsuario, progresoUsuario);
    }

    @Delete('/:id_ProgresoUsuario')
    async eliminarProgresoUsuario(@Param('id_ProgresoUsuario') id_ProgresoUsuario: number) {
        return this.progresoUsuarioUseCase.eliminarProgresoUsuario(id_ProgresoUsuario);
    }
}