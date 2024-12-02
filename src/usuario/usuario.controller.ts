import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { Long } from 'typeorm';
import { UsuarioService } from './usuario.service';
import { UsuarioDto } from './usuario.dto';
import { UsuarioEntity } from './usuario.entity';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Get(':usuarioId')
    async findOne(@Param('usuarioId') usuarioId: Long) {
      return await this.usuarioService.findOne(usuarioId);
    }

    @Post()
    async create(@Body() usuarioDto: UsuarioDto) {
      const usuario: UsuarioEntity = plainToInstance(UsuarioEntity, usuarioDto);
      return await this.usuarioService.create(usuario);
    }

    @Delete(':usuarioId')
    @HttpCode(204)
    async delete(@Param('usuarioId') usuarioId: Long) {
      return await this.usuarioService.delete(usuarioId);
    }
}
