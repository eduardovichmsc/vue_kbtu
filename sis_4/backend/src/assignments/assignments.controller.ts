import { Controller, Get } from '@nestjs/common';
import { AssignmentsService } from './assignments.service.js';

@Controller()
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Get('assignments')
  findAll() {
    return this.assignmentsService.findAll();
  }

  @Get('todos')
  findTodos() {
    return this.assignmentsService.findAll();
  }
}

