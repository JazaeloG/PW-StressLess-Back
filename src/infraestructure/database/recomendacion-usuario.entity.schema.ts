import { Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioEntity } from "./usuario.entity.schema";
import { RecomendacionEntity } from "./recomendacion.entity.schema";

@Entity('recomendaciones_usuario')
export class RecomendacionUsuarioEntity {
  @PrimaryGeneratedColumn()
  id_RecomendacionUsuario: number;
  
  @ManyToOne(() => UsuarioEntity, usuario => usuario.recomendaciones, { eager: true })
  @JoinColumn({ name: 'id_Usuario' })
  usuario: UsuarioEntity;

  @ManyToMany(() => RecomendacionEntity, recomendacion => recomendacion.recomendaciones, { eager: true })
  recomendaciones: RecomendacionEntity[];
}
