import { Injectable } from "@nestjs/common";
import { AuthUseCase } from "src/core/use-cases/auth.use-case";

@Injectable()
export class AuthService{
    constructor(
        private readonly authUseCase: AuthUseCase
    ){}

    async registrarUsuario(usuario){
        return this.authUseCase.registrarUsuario(usuario);
    }

    async login(usuario){
        return this.authUseCase.login(usuario);
    }
}