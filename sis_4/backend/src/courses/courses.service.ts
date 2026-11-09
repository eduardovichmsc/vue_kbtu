import { Injectable } from '@nestjs/common';

@Injectable()
export class CoursesService {
  private courses = [
    {
      id: 1,
      code: 'INFT4111',
      title: 'Cyber Security Fundamentals',
      instructor: 'A. Ziro',
      credits: 5,
      schedule: 'Thursday 15:00 - 17:00',
      room: '362',
      currentGrade: 92,
      attendance: 96,
    },
    {
      id: 2,
      code: 'INFT3230',
      title: 'IT Audit',
      instructor: 'M. Makarov',
      credits: 5,
      schedule: 'Saturday 08:00 - 11:00',
      room: 'Computer Lab 214',
      currentGrade: 88,
      attendance: 10,
    },
    {
      id: 3,
      code: 'INFT3108',
      title: 'IT Project Management',
      instructor: 'A. Bulgakbayeva',
      credits: 5,
      schedule: 'Monday 17:00 - 20:00',
      room: '401',
      currentGrade: 95,
      attendance: 50,
    },
    {
      id: 4,
      code: 'INFТ3141',
      title: 'JS Framework Vue',
      instructor: 'A. Bazarbaeva',
      credits: 5,
      schedule: 'Tuesday 16:00 - 19:00',
      room: '438',
      currentGrade: 84,
      attendance: 90,
    },
    {
      id: 5,
      code: 'INFT3139',
      title: 'JS Framework. React',
      instructor: 'V. Sergeyeva',
      credits: 5,
      schedule: 'Thursday 13:00 - 15:00',
      room: '222',
      currentGrade: 90,
      attendance: 30,
    },
    {
      id: 6,
      code: 'CSCI4236',
      title: 'Power BI: business analysis and data visualization',
      instructor: 'D. Alibekov',
      credits: 5,
      schedule: 'Saturday 16:00 - 19:00',
      room: '220',
      currentGrade: 90,
      attendance: 100,
    },
  ];

  findAll() {
    return this.courses;
  }
}

