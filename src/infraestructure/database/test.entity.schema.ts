import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { TestResultadoEntity } from "./test-resultado.entity.schema";

@Entity('tests')
export class TestEntity{

    @PrimaryGeneratedColumn()
    id_Test: number;

    @Column({type: 'varchar', length: 50})
    test_Nombre: string;

    @Column({type: 'varchar', length: 50})
    test_Descripcion: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    test_FechaCreacion: Date;

    @ManyToMany(() => TestResultadoEntity, TestResultado => TestResultado.test)
    testResultados: TestResultadoEntity[];
}