import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Long, Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { BonoService } from './bono.service';
import { BonoEntity } from './bono.entity';
import { faker } from '@faker-js/faker';
import { UsuarioEntity } from '../usuario/usuario.entity';

describe('BonoService', () => {
  let service: BonoService;
  let repository: Repository<BonoEntity>;
  let bonoList: BonoEntity[] = [];
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [BonoService],
    }).compile();

    service = module.get<BonoService>(BonoService);
    repository = module.get<Repository<BonoEntity>>(getRepositoryToken(BonoEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    bonoList = [];

    for (let i = 0; i < 5; i++) {
      const bono: BonoEntity = await repository.save({
        monto: Number(faker.finance.amount()),
        calificacion: Number(faker.number.float()),
        palabraClave: faker.lorem.word(),
      });

      bonoList.push(bono);
    }};

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all bonos', async () => {
    const bonos: BonoEntity[] = await service.findAll();
    expect(bonos).not.toBeNull();
    expect(bonos.length).toBe(bonoList.length);
  });

  it('findOne should return a bono by id', async () => {
    const storedBono: BonoEntity = bonoList[0];
    const bono: BonoEntity = await service.findOne(storedBono.id);
    expect(bono).not.toBeNull();
    expect(bono.monto).toBe(storedBono.monto);
    expect(bono.calificacion).toBe(storedBono.calificacion);
    expect(bono.palabraClave).toBe(storedBono.palabraClave);
  });

  it('findOne should throw an exception for an invalid bono', async () => {
    await expect(service.findOne(new Long(123))).rejects.toHaveProperty(
      'message',
      'El bono con el ID proporcionado no fue encontrado',
    );
  });

  it('create should return a new bono', async () => {

    const profesor: UsuarioEntity = {
      id: new Long(1922),
      numeroCedula: faker.number.int(),
      nombre: faker.person.firstName(),
      grupoInvestigacion: 'TICSW',
      numeroExtension: 1234,
      rol: 'Profesor',
      jefe: null,
      clases: [],
      bonos: [],
    }

    const bono: BonoEntity = {
      id: new Long(''),
      monto: Number(faker.finance.amount()),
      calificacion: Number(faker.number.float()),
      palabraClave: faker.lorem.word(),
      usuario: profesor,
      clase: null,
    };

    const newBono: BonoEntity = await service.create(bono);
    expect(newBono).not.toBeNull();

    const storedBono = await repository.findOne({
      where: { id: newBono.id },
    });

    expect(storedBono).not.toBeNull();
    expect(storedBono.monto).toBe(bono.monto);
    expect(storedBono.calificacion).toBe(bono.calificacion);
    expect(storedBono.palabraClave).toBe(bono.palabraClave);
  });

  it('create should throw an exception for a bono with a negative value', async () => {
    const bono: BonoEntity = {
      id: new Long(''),
      monto: -10,
      calificacion: Number(faker.number.float()),
      palabraClave: faker.lorem.word(),
      usuario: null,
      clase: null,
    };

    await expect(service.create(bono)).rejects.toHaveProperty(
      'message',
      "El bono no cumple con los requisitos",
    );
  });

  it('delete should remove a bono', async () => {
    const storedBono: BonoEntity = bonoList[0];
    await service.delete(storedBono.id);
    const deletedBono = await repository.findOne({
      where: { id: storedBono.id },
    });
    expect(deletedBono).toBeNull();
  });

  it('delete should throw an exception for an invalid bono', async () => {
    await expect(service.delete(new Long(1922))).rejects.toHaveProperty(
      'message',
      "El bono con el ID proporcionado no fue encontrado",
    );
  });


});
