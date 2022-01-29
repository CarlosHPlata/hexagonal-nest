import { Injectable, Logger } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { RepositoryException } from 'src/core/exceptions';
import { EntityManager } from 'typeorm';
import { Teacher } from '../../core/entities/teacher.entity';
import { ITeacherRepository } from '../../core/interfaces/repositories/teacher.repository';

@Injectable()
export class TeacherRepository implements ITeacherRepository {
  private readonly logger = new Logger('TestRepository');

  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager
  ) {}

  async getTeacher(): Promise<Teacher[]> {
    try {
      const tests: Teacher[] = await this.entityManager
        .getRepository(Teacher)
        .find();

      return tests;
    } catch (e) {
      this.logger.error(e);
      throw new RepositoryException(e.message);
    }
  }

  async getTeacherById(id: number): Promise<Teacher> {
    try {
      const test: Teacher = await this.entityManager
        .getRepository(Teacher)
        .findOne(id);

      return test;
    } catch (e) {
      this.logger.error(e);
      throw new RepositoryException(e.message, { id });
    }
  }

  saveTeacher(teacher: Teacher): Promise<Teacher> {
    try {
      return this.entityManager.getRepository(Teacher).save(teacher);
    } catch (e) {
      this.logger.error(e);
      throw new RepositoryException(e.message);
    }
  }
}
