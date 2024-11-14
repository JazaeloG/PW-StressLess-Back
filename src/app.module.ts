import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentConfigModule } from './infraestructure/config/environment-config/enviroment-config.module';
import { TypeOrmConfigModule } from './infraestructure/config/typeorm/getTypeORM.module';
import { UsuarioModule } from './app/module/usuario.module';
import { AuthModule } from './app/module/auth.module';
import { RecomendacionModule } from './app/module/recomendacion.module';
import { RecomendacionUsuarioModule } from './app/module/recomendacion-usuario.module';
import { TestModule } from './app/module/test.module';
import { TestResultadoModule } from './app/module/test-resultado.module';
import { ProgresoUsuarioModule } from './app/module/progreso-usuario.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    EnvironmentConfigModule,
    TypeOrmConfigModule,
    UsuarioModule,
    AuthModule,
    RecomendacionModule,
    RecomendacionUsuarioModule,
    TestModule,
    TestResultadoModule,
    ProgresoUsuarioModule
  ],
})
export class AppModule {}

