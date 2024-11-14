import { Injectable } from "@nestjs/common";
import { RecomendacionUsuarioUseCase } from "src/core/use-cases/recomendacion-usuario.use-case";
import { RecomendacionUsuarioInterface } from "src/shared/interfaces/recomendacion-usuario.interface";

@Injectable()
export class RecomendacionUsuarioService {

    constructor(private readonly recomendacionUsuarioUseCase: RecomendacionUsuarioUseCase) {}

    async crearRecomendacionUsuario(recomendacionUsuario) {
        return this.recomendacionUsuarioUseCase.crearRecomendacionUsuario(recomendacionUsuario);
    }

    async obtenerRecomendacionUsuarios() {
        return this.recomendacionUsuarioUseCase.obtenerRecomendacionUsuarios();
    }

    async obtenerRecomendacionUsuarioPorID(id_RecomendacionUsuario: number) {
        return this.recomendacionUsuarioUseCase.obtenerRecomendacionUsuarioPorID(id_RecomendacionUsuario);
    }

    async actualizarRecomendacionUsuario(id_RecomendacionUsuario: number, recomendacionUsuario) {
        return this.recomendacionUsuarioUseCase.actualizarRecomendacionUsuario(id_RecomendacionUsuario, recomendacionUsuario);
    }

    async eliminarRecomendacionUsuario(id_RecomendacionUsuario: number) {
        return this.recomendacionUsuarioUseCase.eliminarRecomendacionUsuario(id_RecomendacionUsuario);
    }

}