import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { NewTeacherDto } from '../../core/dtos/newTeacher.dto';
import { Teacher } from '../../core/entities/teacher.entity';
import { SchoolService } from '../../core/services/school.service';

@Controller('/teacher')
@ApiTags('teacher')
export class TestController {
  constructor(private readonly testService: SchoolService) {}

  @ApiResponse({
    description: 'The tests, please delete this module',
    type: Teacher,
    isArray: true
  })
  @Get()
  getTests(): Promise<Teacher[]> {
    return this.testService.getTeachers();
  }

  @ApiResponse({
    description: 'A test, please delete this module',
    type: Teacher
  })
  @Get('/:id')
  getTeacher(@Param('id') id: number): Promise<Teacher> {
    return this.testService.getTeacher(id);
  }

  @ApiResponse({
    description: 'A test, please delete this module',
    type: Teacher
  })
  @Post()
  newTeacher(@Body() newTeacher: NewTeacherDto): Promise<Teacher> {
    return this.testService.createTeacher(newTeacher);
  }
}
