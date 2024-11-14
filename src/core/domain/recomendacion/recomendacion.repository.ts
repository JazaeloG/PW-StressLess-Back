import { Recomendacion } from "./recomendacion.entity";
import { CrearRecomendacionDto } from "src/app/dtos/recomendacion/crear-recomendacion.dto";
import { ActualizarRecomendacionDto } from "src/app/dtos/recomendacion/actualizar-recomendacion.dto";

export interface RecomendacionRepository {
    crearRecomendacion(recomendacion: CrearRecomendacionDto): Promise<Recomendacion>;
    obtenerRecomendacionPorID(recomendacionID: number): Promise<Recomendacion | null>;
    obtenerRecomendaciones(): Promise<Recomendacion[]>;
    actualizarRecomendacion(recomendacionID: number, recomendacion: ActualizarRecomendacionDto): Promise<Recomendacion>;
    eliminarRecomendacion(recomendacionID: number): Promise<void>;
}