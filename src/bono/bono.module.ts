import { Module } from '@nestjs/common';
import { BonoService } from './bono.service';
import { BonoEntity } from './bono.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BonoController } from './bono.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BonoEntity])],
  providers: [BonoService],
  controllers: [BonoController]
})
export class BonoModule {}
