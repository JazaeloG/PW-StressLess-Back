import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { TestResultadoEntity } from "./test-resultado.entity.schema";
import { PreguntaEntity } from "./pregunta.entity.schema";

@Entity('tests')
export class TestEntity {
    @PrimaryGeneratedColumn()
    id_Test: number;

    @Column({ type: 'varchar', length: 255 , nullable: true})
    test_Nombre: string;

    @Column({ type: 'varchar', length: 255 , nullable: true})
    test_Descripcion: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    test_FechaCreacion: Date;

    @ManyToMany(() => PreguntaEntity, (pregunta) => pregunta.tests)
    @JoinTable({ name: "tests_preguntas" })
    preguntas: PreguntaEntity[];

    @ManyToMany(() => TestResultadoEntity, (testResultado) => testResultado.test)
    @JoinTable({ name: "tests_test_resultados" })
    testResultados: TestResultadoEntity[];
}