import {IsNotEmpty, IsString, IsNumber, IsOptional, IsArray} from 'class-validator';
import { Long } from 'typeorm';

export class ClaseDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    codigo: string;

    @IsNumber()
    @IsNotEmpty()
    numeroCreditos: number;

    @IsOptional()
    @IsArray()
    BonosId: Long[];
}
