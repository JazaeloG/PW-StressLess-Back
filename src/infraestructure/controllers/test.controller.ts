import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TestService } from '../../app/services/test.service';
import { CrearTestDto } from 'src/app/dtos/test/crear-test.dto';
import { ActualizarTestDto } from 'src/app/dtos/test/actualizar-test.dto';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  async crearTest(@Body() test: CrearTestDto) {
    return this.testService.crearTest(test);
  }

  @Get()
  async obtenerTests() {
    return this.testService.obtenerTests();
  }

  @Get('/:id')
  async obtenerTestPorID(@Param('id') id: number) {
    return this.testService.obtenerTestPorID(id);
  }

  @Patch('/:id')
  async actualizarTest(@Param('id') id: number, @Body() test: ActualizarTestDto) {
    return this.testService.actualizarTest(id, test);
  }

  @Delete('/:id')
  async eliminarTest(@Param('id') id: number) {
    return this.testService.eliminarTest(id);
  }
}