import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { response } from "express";
import { LoginUsuarioDto } from "src/app/dtos/login/login.dto";
import { CrearUsuarioDto } from "src/app/dtos/usuarios/crear-usuario.dto";
import { JwtAuthGuard } from "src/app/guard/auth.guard";
import { AuthUseCase } from "src/core/use-cases/auth.use-case";

@Controller('auth')
export class AuthController {
    constructor(private readonly authUseCase: AuthUseCase) {} 
    
    @Post('registrar')
    async registrarUsuario(@Body() usuario: CrearUsuarioDto) {
        return this.authUseCase.registrarUsuario(usuario);
    }

    @Post('login')
    async login(@Body() usuario: LoginUsuarioDto) {
        return this.authUseCase.login(usuario);
    }

    @Get('obtener-perfil')
async obtenerPerfil(@Req() req: any) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new Error('El encabezado Authorization no está presente.');
    }

    const [bearer, token] = authorizationHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new Error('El encabezado Authorization no tiene el formato esperado.');
    }

    return await this.authUseCase.obtenerPerfil(token);
  } catch (error) {
    console.error('Error en obtenerPerfil:', error.message);
    throw new Error('Error al procesar el token de autorización.');
  }
}

}