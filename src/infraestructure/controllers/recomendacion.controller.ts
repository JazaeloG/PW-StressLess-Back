import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RecomendacionService } from '../../app/services/recomendacion.service';
import { RecomendacionEntity } from '../../infraestructure/database/recomendacion.entity.schema';

@Controller('recomendacion')
export class RecomendacionController {
  constructor(private readonly recomendacionService: RecomendacionService) {}

  @Post()
  create(@Body() recomendacion: RecomendacionEntity): Promise<RecomendacionEntity> {
    return this.recomendacionService.create(recomendacion);
  }

  @Get()
  findAll(): Promise<RecomendacionEntity[]> {
    return this.recomendacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<RecomendacionEntity> {
    return this.recomendacionService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() recomendacion: RecomendacionEntity): Promise<void> {
    return this.recomendacionService.update(id, recomendacion);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.recomendacionService.remove(id);
  }
}