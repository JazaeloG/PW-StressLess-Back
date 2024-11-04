import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { RecomendacionUsuarioEntity } from "./recomendacion-usuario.entity.schema";

@Entity('recomendaciones')
export class RecomendacionEntity{
    @PrimaryGeneratedColumn()
    id_Recomendacion: number;
    
    @Column({type: 'varchar', length: 50})
    recomendacion_Nombre: string;

    @Column({type: 'varchar', length: 255})
    recomendacion_Descripcion: string;

    @Column({type: 'int', nullable: false})
    recomendacion_NivelRecomendacion: number;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    recomendacion_FechaCreacion: Date;

    @ManyToMany(() => RecomendacionUsuarioEntity, recomendacionUsuario => recomendacionUsuario.recomendaciones)
    recomendaciones: RecomendacionUsuarioEntity[];
}