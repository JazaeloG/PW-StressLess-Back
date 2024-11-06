import { Body, Controller, Post } from "@nestjs/common";
import { LoginUsuarioDto } from "src/app/dtos/login/login.dto";
import { CrearUsuarioDto } from "src/app/dtos/usuarios/crear-usuario.dto";
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
}