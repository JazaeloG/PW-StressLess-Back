import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentConfigModule } from './infraestructure/config/environment-config/enviroment-config.module';
import { TypeOrmConfigModule } from './infraestructure/config/typeorm/getTypeORM.module';
import { UsuarioModule } from './app/module/usuario.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    EnvironmentConfigModule,
    TypeOrmConfigModule,
    UsuarioModule,
  ],
})
export class AppModule {}

