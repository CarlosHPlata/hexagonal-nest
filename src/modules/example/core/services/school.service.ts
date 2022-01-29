import { Inject, Injectable } from '@nestjs/common';
import { NotFoundException, RepositoryException } from 'src/core/exceptions';
import { NewTeacherDto } from '../dtos/newTeacher.dto';
import { Teacher } from '../entities/teacher.entity';
import { ITeacherRepository } from '../interfaces/repositories/teacher.repository';
import { newTeacherMapper } from '../mappers/newTeacher.mapper';

@Injectable()
export class SchoolService {
  constructor(
    @Inject('ITeacherRepository')
    private readonly teacherRepository: ITeacherRepository
  ) {}

  async getTeachers(): Promise<Teacher[]> {
    return await this.teacherRepository.getTeacher();
  }

  async getTeacher(id: number): Promise<Teacher> {
    try {
      const test = await this.teacherRepository.getTeacherById(id);

      if (test == null) throw new NotFoundException('No item found', { id });

      return test;
    } catch (e) {
      if (e instanceof RepositoryException) {
        throw new NotFoundException('No items found due to external issues', {
          id
        });
      }

      throw e;
    }
  }

  createTeacher(newTeacher: NewTeacherDto): Promise<Teacher> {
    const teacher: Teacher = newTeacherMapper(newTeacher);
    return this.teacherRepository.saveTeacher(teacher);
  }
}
