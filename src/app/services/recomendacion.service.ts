import { Injectable } from "@nestjs/common";
import { RecomendacionUseCase } from "src/core/use-cases/recomendacion.use-case";
import { RecomendacionInterface } from "src/shared/interfaces/recomendacion.interface";

@Injectable()
export class RecomendacionService {

    constructor(private readonly recomendacionUseCase: RecomendacionUseCase) {}

    async crearRecomendacion(recomendacion) {
        return this.recomendacionUseCase.crearRecomendacion(recomendacion);
    }

    async obtenerRecomendaciones() {
        return this.recomendacionUseCase.obtenerRecomendaciones();
    }

    async obtenerRecomendacionPorID(id_Recomendacion: number) {
        return this.recomendacionUseCase.obtenerRecomendacionPorID(id_Recomendacion);
    }

    async actualizarRecomendacion(id_Recomendacion: number, recomendacion) {
        return this.recomendacionUseCase.actualizarRecomendacion(id_Recomendacion, recomendacion);
    }

    async eliminarRecomendacion(id_Recomendacion: number) {
        return this.recomendacionUseCase.eliminarRecomendacion(id_Recomendacion);
    }

}