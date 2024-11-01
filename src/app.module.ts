import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/usuario.entity';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    //ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', 
      password: 'postgre1', 
      database: 'StressLess',
      entities: [Usuario],
      synchronize: true, // Solo para desarrollo; elimina o pon en false en producción
      logging: true,
    }),
    UsuarioModule,
  ],
})
export class AppModule {}


/*
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres', 
        password: 'postgre1', 
        database: 'StressLess',
        entities: [Usuario],
        // do NOT use synchronize: true in real projects
        synchronize: true,
      }),
    }),
    UsuarioModule,
  ],
  
})
export class AppModule { }*/