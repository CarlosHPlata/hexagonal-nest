import { Teacher } from '../../entities/teacher.entity';

export interface ITeacherRepository {
  getTeacher(): Promise<Teacher[]>;
  getTeacherById(id: number): Promise<Teacher>;
  saveTeacher(teacher: Teacher): Promise<Teacher>;
}
