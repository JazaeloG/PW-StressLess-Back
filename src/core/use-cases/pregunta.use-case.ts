import { Inject, Injectable } from "@nestjs/common";
import { PreguntaRepository } from "../domain/pregunta/pregunta.repository";

@Injectable()
export class PreguntaUseCase {
    constructor(
        @Inject('PreguntaRepository')
        private readonly preguntaRepository: PreguntaRepository,
    ) {}

    async obtenerPreguntas() {
        return this.preguntaRepository.obtenerPreguntas();
    }

    async obtenerPreguntaPorID(id_Pregunta: number) {
        return this.preguntaRepository.obtenerPreguntaPorID(id_Pregunta);
    }

    async crearPregunta(pregunta) {
        return this.preguntaRepository.crearPregunta(pregunta);
    }

    async actualizarPregunta(id_Pregunta: number, pregunta) {
        return this.preguntaRepository.actualizarPregunta(id_Pregunta, pregunta);
    }

    async eliminarPregunta(id_Pregunta: number) {
        return this.preguntaRepository.eliminarPregunta(id_Pregunta);
    }
}