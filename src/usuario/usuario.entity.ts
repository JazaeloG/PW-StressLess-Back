import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'character varying', length: 100 })
  nombre: string;

  @Column({ type: 'character varying', length: 100 })
  apellido: string;

  @Column({ type: 'character varying', unique: true })
  correo: string;

  @Column({ type: 'varchar', length: 10 })
  sexo: string;

  @Column({ type: 'bigint' })
  edad: number;

  @Column({ type: 'character varying', length: 255 })
  password: string;

  @Column({ type: 'date' })
  fecha_Registro: Date;
}
