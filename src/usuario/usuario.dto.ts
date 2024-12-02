import {IsNotEmpty, IsString, IsNumber, IsOptional, IsArray} from 'class-validator';
import { Long } from 'typeorm';

export class UsuarioDto {
    @IsNumber()
    @IsNotEmpty()
    numeroCedula: number;

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    grupoInvestigacion: string;

    @IsNumber()
    @IsNotEmpty()
    numeroExtension: number;

    @IsString()
    @IsNotEmpty()
    rol: string;

    @IsNotEmpty()
    jefeId: number;

    @IsOptional()
    @IsArray()
    clasesId: Long[];

    @IsOptional()
    @IsArray()
    BonosId: Long[];
}
