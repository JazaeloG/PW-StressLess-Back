import { Injectable } from "@nestjs/common";
import { ProgresoUsuarioUseCase } from "src/core/use-cases/progreso-usuario.use-case";
import { ProgresoUsuarioInterface } from "src/shared/interfaces/progreso-usuario.interface";

@Injectable()
export class ProgresoUsuarioService {

    constructor(private readonly progresoUsuarioUseCase: ProgresoUsuarioUseCase) {}

    async crearProgresoUsuario(progresoUsuario) {
        return this.progresoUsuarioUseCase.crearProgresoUsuario(progresoUsuario);
    }

    async obtenerProgresoUsuarios() {
        return this.progresoUsuarioUseCase.obtenerProgresoUsuarios();
    }

    async obtenerProgresoUsuarioPorID(id_ProgresoUsuario: number) {
        return this.progresoUsuarioUseCase.obtenerProgresoUsuarioPorID(id_ProgresoUsuario);
    }

    async actualizarProgresoUsuario(id_ProgresoUsuario: number, progresoUsuario) {
        return this.progresoUsuarioUseCase.actualizarProgresoUsuario(id_ProgresoUsuario, progresoUsuario);
    }

    async eliminarProgresoUsuario(id_ProgresoUsuario: number) {
        return this.progresoUsuarioUseCase.eliminarProgresoUsuario(id_ProgresoUsuario);
    }

}