import { Injectable } from '@nestjs/common';

@Injectable()
export class AssignmentsService {
  private assignments = [
    {
      id: 1,
      title: 'SIS 4 - Vue & Nest.js Integration',
      completed: true,
      course: 'JS Framework Vue',
      dueDate: '2026-11-15',
      priority: 'High',
    },
    {
      id: 2,
      title: 'Lab 3: Security audit report',
      completed: false,
      course: 'Cyber Security Fundamentals',
      dueDate: '2026-11-18',
      priority: 'Medium',
    },
    {
      id: 3,
      title: 'Midterm preparation and quiz',
      completed: false,
      course: 'IT Audit',
      dueDate: '2026-11-20',
      priority: 'High',
    },
    {
      id: 4,
      title: 'Power BI Sales Dashboard prototype',
      completed: true,
      course: 'Power BI',
      dueDate: '2026-11-22',
      priority: 'Low',
    },
  ];

  findAll() {
    return this.assignments;
  }
}

