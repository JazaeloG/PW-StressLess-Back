import { CrearProgresoUsuarioDto } from "src/app/dtos/progreso/crear-progreso.dto";
import { Inject, Injectable } from "@nestjs/common";
import { ProgresoUsuarioRepository } from "../domain/progreso-usuario/progreso-usuario.repository";
import { ProgresoUsuario } from "../domain/progreso-usuario/progreso-usuario.entity";
import { ActualizarProgresoUsuarioDto } from "src/app/dtos/progreso/actualizar-progreso.dto";

@Injectable()
export class ProgresoUsuarioUseCase {
    constructor(
        @Inject('ProgresoUsuarioRepository')
        private readonly progresoUsuarioRepository: ProgresoUsuarioRepository,
    ) {}

    async crearProgresoUsuario(progresoUsuario: CrearProgresoUsuarioDto): Promise<ProgresoUsuario> {
        return this.progresoUsuarioRepository.crearProgresoUsuario(progresoUsuario);
    }

    async obtenerProgresoUsuarioPorID(progresoUsuarioID: number): Promise<ProgresoUsuario | null> {
        return this.progresoUsuarioRepository.obtenerProgresoUsuarioPorID(progresoUsuarioID);
    }

    async obtenerProgresoUsuarios(): Promise<ProgresoUsuario[]> {
        return this.progresoUsuarioRepository.obtenerProgresoUsuarios();
    }

    async actualizarProgresoUsuario(progresoUsuarioID: number, progresoUsuario: ActualizarProgresoUsuarioDto): Promise<ProgresoUsuario> {
        return this.progresoUsuarioRepository.actualizarProgresoUsuario(progresoUsuarioID, progresoUsuario);
    }

    async eliminarProgresoUsuario(progresoUsuarioID: number): Promise<void> {
        return this.progresoUsuarioRepository.eliminarProgresoUsuario(progresoUsuarioID);
    }
}