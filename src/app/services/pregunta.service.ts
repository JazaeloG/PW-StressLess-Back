import { Injectable } from "@nestjs/common";
import { PreguntaUseCase } from "src/core/use-cases/pregunta.use-case";

@Injectable()
export class PreguntaService{
    constructor(
        private readonly preguntaUseCase: PreguntaUseCase
    ){}

    async obtenerPreguntas(){
        return this.preguntaUseCase.obtenerPreguntas();
    }

    async obtenerPreguntaPorID(id_Pregunta: number){
        return this.preguntaUseCase.obtenerPreguntaPorID(id_Pregunta);
    }

    async crearPregunta(pregunta){
        return this.preguntaUseCase.crearPregunta(pregunta);
    }

    async actualizarPregunta(id_Pregunta: number, pregunta){
        return this.preguntaUseCase.actualizarPregunta(id_Pregunta, pregunta);
    }

    async eliminarPregunta(id_Pregunta: number){
        return this.preguntaUseCase.eliminarPregunta(id_Pregunta);
    }
}