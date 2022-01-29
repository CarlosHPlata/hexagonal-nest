import { NewTeacherDto } from '../dtos/newTeacher.dto';
import { Teacher } from '../entities/teacher.entity';

export const newTeacherMapper = (newTeacher: NewTeacherDto): Teacher => {
  const teacher = new Teacher();

  teacher.name = newTeacher.name;
  teacher.grade = newTeacher.grade;
  teacher.email = newTeacher.email;

  return teacher;
};
