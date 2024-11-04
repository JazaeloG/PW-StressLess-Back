import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthRepository } from "src/core/domain/auth/auth.repository";
import { LoginUsuarioDto } from "src/app/dtos/login/login.dto";
import { CrearUsuarioDto } from "src/app/dtos/usuarios/crear-usuario.dto";
import { UsuarioUseCase } from "src/core/use-cases/usuario.use-case";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthRepositoryImpl implements AuthRepository{
    constructor(
        private readonly usuarioUseCase: UsuarioUseCase,
        private readonly jwtService: JwtService,
    ) { }

    async registrarUsuario(usuario: CrearUsuarioDto): Promise<any> {
        const usuarioExistente = this.usuarioUseCase.obtenerUsuarioPorCorreo(usuario.usuario_Correo);
        if (usuarioExistente) {
            throw new Error('El correo ya está en uso');
        }
        try {
            const nuevoUsuario = this.usuarioUseCase.crearUsuario(usuario);
            return nuevoUsuario;
        } catch (error) {
            throw new Error('Error al crear el usuario');
        }
    }
    
    async login(usuario: LoginUsuarioDto): Promise<any> {
        const usuarioEncontrado = await this.usuarioUseCase.obtenerUsuarioPorCorreo(usuario.usuario_Correo);

        if (!usuarioEncontrado) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }

        const validacionPassword = await this.validarContrasena(usuario.usuario_Password, usuarioEncontrado.usuario_Password);
        
        if (!validacionPassword) {
            throw new HttpException('Contraseña incorrecta', HttpStatus.UNAUTHORIZED);
        }
        
        const payload = { usuario_Correo: usuario.usuario_Correo, sub: usuarioEncontrado.id_Usuario };
        const token = this.jwtService.sign(payload);
        
        return {
            statusCode: HttpStatus.OK,
            message: 'Inicio de sesión exitoso',
            access_token: token,
        };
    }

    async validarContrasena(contrasena: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(contrasena, hash);
    }
}