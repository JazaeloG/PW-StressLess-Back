import { RecomendacionRepository } from "src/core/domain/recomendacion/recomendacion.repository";
import { Recomendacion } from "src/core/domain/recomendacion/recomendacion.entity";
import { CrearRecomendacionDto } from "src/app/dtos/recomendacion/crear-recomendacion.dto";
import { ActualizarRecomendacionDto } from "src/app/dtos/recomendacion/actualizar-recomendacion.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { RecomendacionEntity } from "../database/recomendacion.entity.schema";

@Injectable()
export class RecomendacionRepositoryImpl implements RecomendacionRepository {

    constructor(
        @InjectRepository(RecomendacionEntity)
        private readonly recomendacionRepository: Repository<RecomendacionEntity>,
    ) { }

    async crearRecomendacion(recomendacion: CrearRecomendacionDto): Promise<Recomendacion> {
        try {
            const nuevaRecomendacion = this.recomendacionRepository.create(recomendacion);
            return await this.recomendacionRepository.save(nuevaRecomendacion);
        } catch (error) {
            console.error('Error al guardar la nueva recomendación:', error);
            throw new HttpException('Error al crear la recomendación', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async obtenerRecomendacionPorID(recomendacionID: number): Promise<Recomendacion | null> {
        const recomendacion = await this.recomendacionRepository.findOne({ where: { id_Recomendacion: recomendacionID } });
        if (!recomendacion) {
            throw new HttpException('Recomendación no encontrada', HttpStatus.NOT_FOUND);
        }
        return recomendacion;
    }

    async obtenerRecomendaciones(): Promise<Recomendacion[]> {
        return this.recomendacionRepository.find();
    }

    async actualizarRecomendacion(recomendacionID: number, recomendacion: ActualizarRecomendacionDto): Promise<Recomendacion> {
        const recomendacionExistente = await this.recomendacionRepository.findOne({ where: { id_Recomendacion: recomendacionID } });
        if (!recomendacionExistente) {
            throw new HttpException('Recomendación no encontrada', HttpStatus.NOT_FOUND);
        }

        Object.assign(recomendacionExistente, recomendacion);

        try {
            return await this.recomendacionRepository.save(recomendacionExistente);
        } catch (error) {
            console.error('Error al actualizar la recomendación:', error);
            throw new HttpException('Error al actualizar la recomendación', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async eliminarRecomendacion(recomendacionID: number): Promise<void> {
        const recomendacionExistente = await this.recomendacionRepository.findOne({ where: { id_Recomendacion: recomendacionID } });
        if (!recomendacionExistente) {
            throw new HttpException('Recomendación no encontrada', HttpStatus.NOT_FOUND);
        }

        try {
            await this.recomendacionRepository.remove(recomendacionExistente);
        } catch (error) {
            console.error('Error al eliminar la recomendación:', error);
            throw new HttpException('Error al eliminar la recomendación', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}