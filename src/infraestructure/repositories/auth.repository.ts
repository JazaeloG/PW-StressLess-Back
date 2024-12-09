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
        const usuarioExistente = await this.usuarioUseCase.obtenerUsuarioPorCorreo(usuario.usuario_Correo);
        if (usuarioExistente) {
            throw new HttpException('El correo ya está en uso', HttpStatus.BAD_REQUEST);
        }
        try {
            const nuevoUsuario = await this.usuarioUseCase.crearUsuario(usuario);
            return nuevoUsuario;
        } catch (error) {
            throw new HttpException(error , HttpStatus.INTERNAL_SERVER_ERROR);
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
        
        const payload = { correo: usuario.usuario_Correo, id: usuarioEncontrado.id_Usuario };
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


    async obtenerPorToken(token: string): Promise<any> {
        try{
            const payloadVerificado = this.jwtService.verify(token);
            const cuenta = await this.usuarioUseCase.obtenerUsuarioPorID(payloadVerificado.id);

            if(!cuenta){
                throw new HttpException('Cuenta no encontrada', HttpStatus.NOT_FOUND);
            }

            return cuenta;
        }catch(error){
            throw new HttpException('Token invalido', HttpStatus.UNAUTHORIZED);
        }
    }

    
        
}