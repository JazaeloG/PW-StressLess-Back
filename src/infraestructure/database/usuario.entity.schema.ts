import { SexoEnum } from "src/shared/enums/sexo.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProgresoUsuarioEntity } from "./progreso-usuario.entity.schema";
import { TestResultadoEntity } from "./test-resultado.entity.schema";
import { RecomendacionUsuarioEntity } from "./recomendacion-usuario.entity.schema";

@Entity('usuario')
export class UsuarioEntity{
    @PrimaryGeneratedColumn()
    id_Usuario: number;

    @Column({type: 'varchar', length: 50, nullable: false})
    usuario_Nombre: string;

    @Column({type: 'varchar', length: 50, nullable: false})
    usuario_Apellido: string;

    @Column({type: 'varchar', nullable: false, unique: true})
    usuario_Correo: string;

    @Column({type: 'enum', enum: SexoEnum, default: SexoEnum.OTRO})
    usuario_Sexo: SexoEnum;

    @Column({type: 'int', nullable: true})
    usuario_Edad: number;

    @Column({type: 'varchar', length: 255})
    usuario_Password: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    usuario_FechaRegistro: Date;

    @OneToMany(() => ProgresoUsuarioEntity, progreso => progreso.usuario)
    progresos: ProgresoUsuarioEntity[];

    @OneToMany(() => TestResultadoEntity, testResultado => testResultado.usuario)
    testResultados: TestResultadoEntity[];

    @OneToMany(() => RecomendacionUsuarioEntity, recomendacionUsuario => recomendacionUsuario.usuario)
    recomendaciones: RecomendacionUsuarioEntity[];
}