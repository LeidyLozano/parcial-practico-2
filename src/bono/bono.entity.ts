/* eslint-disable prettier/prettier */
import { ClaseEntity } from '../clase/clase.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { Column, Entity, Long, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BonoEntity {

    @PrimaryGeneratedColumn()
    id: Long;

    @Column()
    monto: number;

    @Column()
    calificacion: number;

    @Column()
    palabraClave: string;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.bonos)
    usuario: UsuarioEntity;

    @ManyToOne(() => ClaseEntity, clase => clase.bonos)
    clase: ClaseEntity;
}
