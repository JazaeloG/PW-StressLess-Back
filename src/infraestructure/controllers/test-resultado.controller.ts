import { Controller, Post, Body, Get, Delete, Param, Patch } from '@nestjs/common';
import { TestResultadoService } from '../../app/services/test-resultado.service';
import { CrearTestResultadoDto } from 'src/app/dtos/test-resultado/crear-test-resultado.dto';
import { ActualizarTestResultadoDto } from 'src/app/dtos/test-resultado/actualizar-test-resultado.dto';

@Controller('test-resultado')
export class TestResultadoController {
  constructor(private readonly testResultadoService: TestResultadoService) {}

  @Post()
  async crearTestResultado(@Body() testResultado: CrearTestResultadoDto) {
    return this.testResultadoService.crearTestResultado(testResultado);
  }

  @Get()
  async obtenerTestResultados() {
    return this.testResultadoService.obtenerTestResultados();
  }

  @Get('/:id')
  async obtenerTestResultadoPorID(@Param('id') id: number) {
    return this.testResultadoService.obtenerTestResultadoPorID(id);
  }

  @Patch('/:id')
  async actualizarTestResultado(@Param('id') id: number, @Body() testResultado: ActualizarTestResultadoDto) {
    return this.testResultadoService.actualizarTestResultado(id, testResultado);
  }

  @Delete('/:id')
  async eliminarTestResultado(@Param('id') id: number) {
    return this.testResultadoService.eliminarTestResultado(id);
  }
}