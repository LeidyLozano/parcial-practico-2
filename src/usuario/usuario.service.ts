import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Long, Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';


@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ){}

    async create(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        if(usuario.rol === "Profesor")
            if(usuario.grupoInvestigacion === "TICSW" || usuario.grupoInvestigacion === "IMAGINE" || usuario.grupoInvestigacion === "COMIT")
                return await this.usuarioRepository.save(usuario);
        if (usuario.rol === "Decana")
            if (usuario.numeroExtension.toString().length === 8)
                return await this.usuarioRepository.save(usuario);
        throw new BusinessLogicException("El usuario no cumple con los requisitos", BusinessError.BAD_REQUEST);
    }

    async findOne(id: Long): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id}, relations: ["clases", "bonos"] } );
        if (!usuario)
          throw new BusinessLogicException("El usuario con el ID proporcionado no fue encontrado", BusinessError.NOT_FOUND);
        return usuario;
    }

    async delete(id: Long) {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where:{id}});
        if (!usuario)
          throw new BusinessLogicException("El usuario con el ID proporcionado no fue encontrado", BusinessError.NOT_FOUND);

        if(usuario.rol === "Decana")
            throw new BusinessLogicException("No se puede eliminar a la decana", BusinessError.PRECONDITION_FAILED);

        if(usuario.bonos.length > 0)
            throw new BusinessLogicException("El usuario tiene bonos asignados", BusinessError.PRECONDITION_FAILED);
     
        await this.usuarioRepository.remove(usuario);
    }
}
