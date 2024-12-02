import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { BonoService } from './bono.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { Long } from 'typeorm';
import { BonoDto } from './bono.dto';
import { BonoEntity } from './bono.entity';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('bono')
export class BonoController {
    constructor(private readonly bonoService: BonoService) {}

    @Get()
    async findAll() {
      return await this.bonoService.findAll();
    }

    @Get(':bonoId')
    async findOne(@Param('bonoId') bonoId: Long) {
      return await this.bonoService.findOne(bonoId);
    }

    @Post()
    async create(@Body() bonoDto: BonoDto) {
      const bono: BonoEntity = plainToInstance(BonoEntity, bonoDto);
      return await this.bonoService.create(bono);
    }

    @Delete(':bonoId')
    @HttpCode(204)
    async delete(@Param('bonoId') bonoId: Long) {
      return await this.bonoService.delete(bonoId);
    }
}
