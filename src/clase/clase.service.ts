import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Long, Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { ClaseEntity } from './clase.entity';

@Injectable()
export class ClaseService {
    constructor(
        @InjectRepository(ClaseEntity)
        private readonly claseRepository: Repository<ClaseEntity>
    ){}

    async create(clase: ClaseEntity): Promise<ClaseEntity> {
        if(clase.codigo.length !== 10)
            throw new BusinessLogicException("El código de la clase debe tener 10 caracteres", BusinessError.BAD_REQUEST);
        return await this.claseRepository.save(clase);
    }

    async findOne(id: Long): Promise<ClaseEntity> {
        const clase: ClaseEntity = await this.claseRepository.findOne({where: {id}, relations: ["bonos"] } );
        if (!clase)
          throw new BusinessLogicException("La clase con el ID proporcionado no fue encontrado", BusinessError.NOT_FOUND);
        return clase;
    }
}
