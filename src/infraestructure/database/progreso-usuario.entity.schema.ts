import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioEntity } from "./usuario.entity.schema";

@Entity('progreso_usuario')
export class ProgresoUsuarioEntity{
    @PrimaryGeneratedColumn()
    id_ProgresoUsuario: number;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.id_Usuario)
    @JoinColumn({name: 'id_Usuario'})
    usuario: UsuarioEntity;

    @Column({ type: 'int', nullable: false })
    nivel_EstresAntes: number;

    @Column({ type: 'int', nullable: false })
    nivel_EstresNuevo: number;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    progreso_Fecha: Date;
}