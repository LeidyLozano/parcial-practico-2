import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Long, Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { BonoEntity } from './bono.entity';


@Injectable()
export class BonoService {
    constructor(
        @InjectRepository(BonoEntity)
        private readonly bonoRepository: Repository<BonoEntity>
    ){}

    async create(bono: BonoEntity): Promise<BonoEntity> {
        if(bono.monto > 0 && !bono && bono.usuario.rol === "Profesor")
            return await this.bonoRepository.save(bono);
        throw new BusinessLogicException("El bono no cumple con los requisitos", BusinessError.BAD_REQUEST);
    }

    async findAll(): Promise<BonoEntity[]> {
        return await this.bonoRepository.find({ relations: ["usuario", "clase"] });
    }

    async findOne(id: Long): Promise<BonoEntity> {
        const bono: BonoEntity = await this.bonoRepository.findOne({where: {id}, relations:["usuario", "clase"] } );
        if (!bono)
          throw new BusinessLogicException("El bono con el ID proporcionado no fue encontrado", BusinessError.NOT_FOUND);
        return bono;
    }

    async delete(id: Long) {
        const bono: BonoEntity = await this.bonoRepository.findOne({where:{id}});
        if (!bono)
            throw new BusinessLogicException("El bono con el ID proporcionado no fue encontrado", BusinessError.NOT_FOUND);
        
        if(bono.calificacion > 4)
            throw new BusinessLogicException("El bono con el ID proporcionado no puede ser eliminado", BusinessError.BAD_REQUEST);

        await this.bonoRepository.remove(bono);
    }
}
