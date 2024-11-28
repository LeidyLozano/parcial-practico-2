import { Module } from '@nestjs/common';
import { BonoService } from './bono.service';
import { BonoEntity } from './bono.entity/bono.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BonoEntity])],
  providers: [BonoService]
})
export class BonoModule {}
