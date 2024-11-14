import { CrearRecomendacionUsuarioDto } from "src/app/dtos/recomendacion-usuario/crear-recomendacion-usuario.dto";
import { Inject, Injectable } from "@nestjs/common";
import { RecomendacionUsuarioRepository } from "../domain/recomendacion-usuario/recomendacion-usuario.repository";
import { RecomendacionUsuario } from "../domain/recomendacion-usuario/recomendacion-usuario.entity";
import { ActualizarRecomendacionUsuarioDto } from "src/app/dtos/recomendacion-usuario/actualizar-recomendacion-usuario.dto";

@Injectable()
export class RecomendacionUsuarioUseCase {
    constructor(
        @Inject('RecomendacionUsuarioRepository')
        private readonly recomendacionUsuarioRepository: RecomendacionUsuarioRepository,
    ) {}

    async crearRecomendacionUsuario(recomendacionUsuario: CrearRecomendacionUsuarioDto): Promise<RecomendacionUsuario> {
        return this.recomendacionUsuarioRepository.crearRecomendacionUsuario(recomendacionUsuario);
    }

    async obtenerRecomendacionUsuarioPorID(recomendacionUsuarioID: number): Promise<RecomendacionUsuario | null> {
        return this.recomendacionUsuarioRepository.obtenerRecomendacionUsuarioPorID(recomendacionUsuarioID);
    }

    async obtenerRecomendacionUsuarios(): Promise<RecomendacionUsuario[]> {
        return this.recomendacionUsuarioRepository.obtenerRecomendacionUsuarios();
    }

    async actualizarRecomendacionUsuario(recomendacionUsuarioID: number, recomendacionUsuario: ActualizarRecomendacionUsuarioDto): Promise<RecomendacionUsuario> {
        return this.recomendacionUsuarioRepository.actualizarRecomendacionUsuario(recomendacionUsuarioID, recomendacionUsuario);
    }

    async eliminarRecomendacionUsuario(recomendacionUsuarioID: number): Promise<void> {
        return this.recomendacionUsuarioRepository.eliminarRecomendacionUsuario(recomendacionUsuarioID);
    }
}