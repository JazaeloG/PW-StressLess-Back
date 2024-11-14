import { CrearRecomendacionDto } from "src/app/dtos/recomendacion/crear-recomendacion.dto";
import { ActualizarRecomendacionDto } from "src/app/dtos/recomendacion/actualizar-recomendacion.dto";
import { Inject, Injectable } from "@nestjs/common";
import { RecomendacionRepository } from "../domain/recomendacion/recomendacion.repository";
import { Recomendacion } from "../domain/recomendacion/recomendacion.entity";

@Injectable()
export class RecomendacionUseCase {

    constructor(
        @Inject('RecomendacionRepository')
        private readonly recomendacionRepository: RecomendacionRepository,
    ) {}

    async crearRecomendacion(recomendacion: CrearRecomendacionDto): Promise<Recomendacion> {
        return this.recomendacionRepository.crearRecomendacion(recomendacion);
    }

    async obtenerRecomendacionPorID(recomendacionID: number): Promise<Recomendacion | null> {
        return this.recomendacionRepository.obtenerRecomendacionPorID(recomendacionID);
    }

    async obtenerRecomendaciones(): Promise<Recomendacion[]> {
        return this.recomendacionRepository.obtenerRecomendaciones();
    }

    async actualizarRecomendacion(recomendacionID: number, recomendacion: ActualizarRecomendacionDto): Promise<Recomendacion> {
        return this.recomendacionRepository.actualizarRecomendacion(recomendacionID, recomendacion);
    }

    async eliminarRecomendacion(recomendacionID: number): Promise<void> {
        return this.recomendacionRepository.eliminarRecomendacion(recomendacionID);
    }
}