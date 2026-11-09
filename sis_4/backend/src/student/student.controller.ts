import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { StudentService } from './student.service.js';

@Controller()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('student/profile')
  getProfile() {
    return this.studentService.getProfile();
  }

  @Put('student/profile')
  updateProfile(@Body() body: any) {
    return this.studentService.updateProfile(body);
  }

  @Get('users/1')
  getUserOne() {
    return this.studentService.getProfile();
  }

  @Put('users/1')
  updateUserOne(@Body() body: any) {
    return this.studentService.updateProfile(body);
  }

  @Get('students')
  getStudents() {
    return this.studentService.getStudents();
  }

  @Get('users')
  getUsers() {
    return this.studentService.getStudents();
  }
}

