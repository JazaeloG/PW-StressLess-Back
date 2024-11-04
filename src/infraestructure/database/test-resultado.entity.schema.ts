import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioEntity } from "./usuario.entity.schema";
import { TestEntity } from "./test.entity.schema";

@Entity('test_resultados')
export class TestResultadoEntity{
    @PrimaryGeneratedColumn()
    id_TestResultado: number;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.id_Usuario)
    @JoinColumn({name: 'id_Usuario'})
    usuario: UsuarioEntity;

    @ManyToMany(() => TestEntity, test => test.id_Test)
    @JoinColumn({name: 'id_Test'})
    test: TestEntity;

    @Column({ type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    testResultado_Fecha: Date;

    @Column({ type: 'int', nullable: false })
    testResultado_Puntaje: number;

    @Column({ type: 'varchar', length: 255 })
    testResultado_Comentarios: string;

}