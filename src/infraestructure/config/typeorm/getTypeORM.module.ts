import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { EnvironmentConfigService } from "../environment-config/environment-config.service";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EnvironmentConfigModule } from "../environment-config/enviroment-config.module";
import { UsuarioEntity } from "src/infraestructure/database/usuario.entity.schema";
import { ProgresoUsuarioEntity } from "src/infraestructure/database/progreso-usuario.entity.schema";
import { RecomendacionEntity } from "src/infraestructure/database/recomendacion.entity.schema";
import { RecomendacionUsuarioEntity } from "src/infraestructure/database/recomendacion-usuario.entity.schema";
import { TestEntity } from "src/infraestructure/database/test.entity.schema";
import { TestResultadoEntity } from "src/infraestructure/database/test-resultado.entity.schema";

export const getTypeOrmModuleOptions = (
    envConfigService: EnvironmentConfigService,
): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: envConfigService.getHostBaseDatos(),
    port: envConfigService.getPuertoBaseDatos(),
    username: envConfigService.getUsuarioBaseDatos(),
    password: envConfigService.getContraseñaBaseDatos(),
    database: envConfigService.getNombreBaseDatos(),
    entities: [
        UsuarioEntity,
        ProgresoUsuarioEntity,
        RecomendacionEntity,
        RecomendacionUsuarioEntity,
        TestEntity,
        TestResultadoEntity
    ],
    synchronize: true,
    extra: {
        ssl: false,
        sslmode: 'require',
    } as TypeOrmModuleOptions,
});

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [EnvironmentConfigModule],
            inject: [EnvironmentConfigService],
            useFactory: getTypeOrmModuleOptions,
        }),
    ],
})

export class TypeOrmConfigModule {}