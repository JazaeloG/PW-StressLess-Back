import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { TestEntity } from "./test.entity.schema";

@Entity('preguntas')
export class PreguntaEntity {
    @PrimaryGeneratedColumn()
    id_Pregunta: number;

    @Column({ type: 'text' })
    pregunta_Texto: string;

    @ManyToMany(() => TestEntity, (test) => test.preguntas)
    tests: TestEntity[];
}
