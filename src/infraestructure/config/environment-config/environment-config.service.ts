import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {

    constructor(private configService: ConfigService) {}

    getHostBaseDatos(): string {
        return this.configService.get<string>('HOST_BASE_DATOS');
    }

    getPuertoBaseDatos(): number {
        return this.configService.get<number>('PUERTO_BASE_DATOS');
    }

    getUsuarioBaseDatos(): string {
        return this.configService.get<string>('USUARIO_BASE_DATOS');
    }

    getContraseñaBaseDatos(): string {
        return this.configService.get<string>('CONTRASENA_BASE_DATOS');
    }

    getNombreBaseDatos(): string {
        return this.configService.get<string>('NOMBRE_BASE_DATOS');
    }

    getJwtSecret(): string {
        return this.configService.get<string>('JWT_SECRET');
    }
}