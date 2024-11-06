import { Inject, Injectable } from "@nestjs/common";
import { AuthRepository } from "../domain/auth/auth.repository";

@Injectable()
export class AuthUseCase{
    constructor(
        @Inject('AuthRepository')
        private readonly authRepository: AuthRepository,
    ){}

    async registrarUsuario(usuario: any): Promise<any>{
        return this.authRepository.registrarUsuario(usuario);
    }

    async login(usuario: any): Promise<any>{
        return this.authRepository.login(usuario);
    }
}