import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './core/entities/teacher.entity';
import { SchoolService } from './core/services/school.service';
import { TestController } from './infrastructure/controllers/school.controller';
import { TeacherRepository } from './infrastructure/repositories/teacher.repository';

const services = [SchoolService];

const interfaces = [
  { provide: 'ITeacherRepository', useClass: TeacherRepository }
];

const entities = [Teacher];

const controllers = [TestController];

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [...controllers],
  providers: [...services, ...interfaces],
  exports: []
})
export class ExampleModule {}
