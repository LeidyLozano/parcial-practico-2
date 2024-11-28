/* eslint-disable prettier/prettier */
import { BonoEntity } from 'src/bono/bono.entity/bono.entity';
import { ClaseEntity } from 'src/clase/clase.entity/clase.entity';
import { Column, Entity, Long, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id: Long;

    @Column()
    numeroCedula: number;

    @Column()
    nombre: string;

    @Column()
    grupoInvestigacion: string;

    @Column()
    numeroExtension: number;

    @Column()
    rol: string;

    @Column()
    jefe: UsuarioEntity;

    @OneToMany(() => ClaseEntity, clase => clase.profesor)
    clases: ClaseEntity[];

    @OneToMany(() => BonoEntity, bono => bono.usuario)
    bonos: BonoEntity[];
}