import { Controller, Post, Body, Get, Delete, Param, Patch } from "@nestjs/common";
import { RecomendacionService } from "../../app/services/recomendacion.service";
import { CrearRecomendacionDto } from "src/app/dtos/recomendacion/crear-recomendacion.dto";
import { ActualizarRecomendacionDto } from "src/app/dtos/recomendacion/actualizar-recomendacion.dto";

@Controller('recomendacion')
export class RecomendacionController {
    
    constructor(private readonly recomendacionService: RecomendacionService) {}

    @Post()
    async crearRecomendacion(@Body() recomendacion: CrearRecomendacionDto) {
        return this.recomendacionService.crearRecomendacion(recomendacion);
    }

    @Get()
    async obtenerRecomendaciones() {
        return this.recomendacionService.obtenerRecomendaciones();
    }

    @Get('/:id')
    async obtenerRecomendacionPorID(@Param('id') id: number) {
        return this.recomendacionService.obtenerRecomendacionPorID(id);
    }

    @Patch('/:id')
    async actualizarRecomendacion(@Param('id') id: number, @Body() recomendacion: ActualizarRecomendacionDto) {
        return this.recomendacionService.actualizarRecomendacion(id, recomendacion);
    }

    @Delete('/:id')
    async eliminarRecomendacion(@Param('id') id: number) {
        return this.recomendacionService.eliminarRecomendacion(id);
    }
}