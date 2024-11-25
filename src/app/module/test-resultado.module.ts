import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestResultadoController } from 'src/infraestructure/controllers/test-resultado.controller';
import { TestResultadoUseCase } from 'src/core/use-cases/test-resultado.use-case';
import { TestResultadoService } from 'src/app/services/test-resultado.service';
import { TestResultadoRepositoryImpl } from 'src/infraestructure/repositories/test-resultado.repository';
import { TestResultadoEntity } from 'src/infraestructure/database/test-resultado.entity.schema';
import { UsuarioEntity } from 'src/infraestructure/database/usuario.entity.schema';
import { TestEntity } from 'src/infraestructure/database/test.entity.schema';
import { TestModule } from './test.module';
import { ProgresoUsuarioEntity } from 'src/infraestructure/database/progreso-usuario.entity.schema';
import { ProgresoUsuarioModule } from './progreso-usuario.module';
import { UsuarioModule } from './usuario.module';
import { Recomendacion } from 'src/core/domain/recomendacion/recomendacion.entity';
import { RecomendacionEntity } from 'src/infraestructure/database/recomendacion.entity.schema';
import { RecomendacionUsuarioEntity } from 'src/infraestructure/database/recomendacion-usuario.entity.schema';
import { RecomendacionModule } from './recomendacion.module';

@Module({
  imports: [TypeOrmModule.forFeature([TestResultadoEntity, UsuarioEntity, TestEntity, ProgresoUsuarioEntity, RecomendacionEntity, RecomendacionUsuarioEntity]),
    TestModule,
    ProgresoUsuarioModule,
    UsuarioModule,
    RecomendacionModule
],
  controllers: [TestResultadoController],
  providers: [
    TestResultadoService,
    TestResultadoUseCase,
    {
      provide: 'TestResultadoRepository',
      useClass: TestResultadoRepositoryImpl,
    },
  ],
  exports: [TestResultadoUseCase, TestResultadoService],
})
export class TestResultadoModule {}