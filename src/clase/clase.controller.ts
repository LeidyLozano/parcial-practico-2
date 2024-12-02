import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { Long } from 'typeorm';
import { ClaseService } from './clase.service';
import { ClaseEntity } from './clase.entity';
import { ClaseDto } from './clase.dto';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('clase')
export class ClaseController {
    constructor(private readonly claseService: ClaseService) {}

    @Get(':claseId')
    async findOne(@Param('claseId') claseId: Long) {
      return await this.claseService.findOne(claseId);
    }

    @Post()
    async create(@Body() claseDto: ClaseDto) {
      const clase: ClaseEntity = plainToInstance(ClaseEntity, claseDto);
      return await this.claseService.create(clase);
    }
}
