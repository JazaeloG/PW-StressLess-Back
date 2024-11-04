import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tests')
export class Test{

    @PrimaryGeneratedColumn()
    id_Test: number;

    @Column({type: 'varchar', length: 50})
    test_Nombre: string;

    @Column({type: 'varchar', length: 50})
    test_Descripcion: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    test_FechaCreacion: Date;
}