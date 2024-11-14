import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TestService } from '../../app/services/test.service';
import { TestEntity } from '../../infraestructure/database/test.entity.schema';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  create(@Body() test: TestEntity): Promise<TestEntity> {
    return this.testService.create(test);
  }

  @Get()
  findAll(): Promise<TestEntity[]> {
    return this.testService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<TestEntity> {
    return this.testService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() test: TestEntity): Promise<void> {
    return this.testService.update(id, test);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.testService.remove(id);
  }
}