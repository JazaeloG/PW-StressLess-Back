import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PreguntaRepository } from "src/core/domain/pregunta/pregunta.repository";
import { PreguntaEntity } from "../database/pregunta.entity.schema";
import { CrearPreguntaDto } from "src/app/dtos/pregunta/crear-pregunta.dto";
import { Pregunta } from "src/core/domain/pregunta/pregunta.entity";
import { Repository } from "typeorm";


@Injectable()
export class PreguntaRepositoryImpl implements PreguntaRepository{
    constructor(
        @InjectRepository(PreguntaEntity)
        private readonly preguntaRepository: Repository<PreguntaEntity>,
    ){}
    obtenerPreguntaPorID(preguntaID: number): Promise<Pregunta | null> {
        const pregunta = this.preguntaRepository.findOne({where: {id_Pregunta: preguntaID}});
        return pregunta;
    }
    obtenerPreguntas(): Promise<Pregunta[]> {
        const preguntas = this.preguntaRepository.find();
        return preguntas;
    }
    actualizarPregunta(preguntaID: number, pregunta: CrearPreguntaDto): Promise<any> {
        const preguntaActualizada = this.preguntaRepository.update({id_Pregunta: preguntaID}, pregunta);
        return preguntaActualizada;
    }
    eliminarPregunta(preguntaID: number): Promise<any> {
        const preguntaEliminada = this.preguntaRepository.delete({id_Pregunta: preguntaID});
        return preguntaEliminada;
    }

    async crearPregunta(pregunta: CrearPreguntaDto): Promise<Pregunta>{
        const nuevaPregunta = this.preguntaRepository.create(pregunta);
        const preguntaGuardada = await this.preguntaRepository.save(nuevaPregunta);
        return preguntaGuardada;
    }

}