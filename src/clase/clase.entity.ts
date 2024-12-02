/* eslint-disable prettier/prettier */
import { BonoEntity } from '../bono/bono.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { Column, Entity, Long, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClaseEntity {

    @PrimaryGeneratedColumn()
    id: Long;

    @Column()
    nombre: string;

    @Column()
    codigo: string;

    @Column()
    numeroCreditos: number;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.clases)
    profesor: UsuarioEntity;

    @OneToMany(() => BonoEntity, bono => bono.clase)
    bonos: BonoEntity[];
}
