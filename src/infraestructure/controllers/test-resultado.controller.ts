import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TestResultadoService } from '../../app/services/test-resultado.service';
import { TestResultadoEntity } from '../../infraestructure/database/test-resultado.entity.schema';

@Controller('test-resultado')
export class TestResultadoController {
  constructor(private readonly testResultadoService: TestResultadoService) {}

  @Post()
  create(@Body() testResultado: TestResultadoEntity): Promise<TestResultadoEntity> {
    return this.testResultadoService.create(testResultado);
  }

  @Get()
  findAll(): Promise<TestResultadoEntity[]> {
    return this.testResultadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<TestResultadoEntity> {
    return this.testResultadoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() testResultado: TestResultadoEntity): Promise<void> {
    return this.testResultadoService.update(id, testResultado);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.testResultadoService.remove(id);
  }
}