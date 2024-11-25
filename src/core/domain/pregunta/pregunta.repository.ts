import { CrearPreguntaDto } from "src/app/dtos/pregunta/crear-pregunta.dto";
import { Pregunta } from "./pregunta.entity";

export interface PreguntaRepository {
    crearPregunta(pregunta: CrearPreguntaDto): Promise<Pregunta>;
    obtenerPreguntaPorID(preguntaID: number): Promise<Pregunta | null>;
    obtenerPreguntas(): Promise<Pregunta[]>;
    actualizarPregunta(preguntaID: number, pregunta: CrearPreguntaDto): Promise<Pregunta>;
    eliminarPregunta(preguntaID: number): Promise<void>;
}