/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString, IsNumber, IsOptional} from 'class-validator';
import { Long } from 'typeorm';

export class BonoDto {

        @IsNumber()
        @IsNotEmpty()
        monto: number;
    
        @IsNumber()
        @IsNotEmpty()
        calificacion: number;
    
        @IsString()
        @IsNotEmpty()
        palabraClave: string;
    
        @IsOptional()
        usuarioId: Long;
        
        @IsOptional()
        claseId: Long;
    }
