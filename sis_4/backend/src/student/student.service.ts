import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentService {
  private profile = {
    id: 1,
    studentId: '24B271271',
    name: 'Darzhan Eduardovich',
    username: 'darzhan',
    email: 'd_eduardovich@kbtu.kz',
    phone: '+7 (777) 123-45-67',
    website: 'darzhan.dev',
    address: 'Almaty, Tole Bi 59',
    faculty: 'School of Information Technology and Engineering',
    major: 'Information Systems',
    degree: 'Bachelor',
    year: 3,
    semester: 'Fall 2026',
    gpa: 2.0,
    creditsCompleted: 114,
    totalCredits: 140,
    academicStatus: 'Active',
    advisor: 'N. Kaster',
  };

  private students = [
    {
      id: 1,
      studentId: '24B271271',
      name: 'Darzhan Eduardovich',
      email: 'd_eduardovich@kbtu.kz',
      phone: '+7 (777) 123-45-67',
      city: 'Almaty',
      group: 'IS-22-1',
      gpa: '2.00',
      status: 'Active',
    },
    {
      id: 2,
      studentId: '24B271272',
      name: 'Ernar Sabyrov',
      email: 'e_sabyrov@kbtu.kz',
      phone: '+7 (777) 234-56-78',
      city: 'Astana',
      group: 'IS-22-1',
      gpa: '3.85',
      status: 'Honor Roll',
    },
    {
      id: 3,
      studentId: '24B271273',
      name: 'Alikhan Bekov',
      email: 'a_bekov@kbtu.kz',
      phone: '+7 (777) 345-67-89',
      city: 'Shymkent',
      group: 'IS-22-1',
      gpa: '3.45',
      status: 'Active',
    },
    {
      id: 4,
      studentId: '24B271274',
      name: 'Madina Kairatova',
      email: 'm_kairatova@kbtu.kz',
      phone: '+7 (777) 456-78-90',
      city: 'Almaty',
      group: 'IS-22-1',
      gpa: '3.92',
      status: 'Honor Roll',
    },
    {
      id: 5,
      studentId: '24B271275',
      name: 'Dias Zhumabayev',
      email: 'd_zhumabayev@kbtu.kz',
      phone: '+7 (777) 567-89-01',
      city: 'Karaganda',
      group: 'IS-22-1',
      gpa: '3.10',
      status: 'Active',
    },
    {
      id: 6,
      studentId: '24B271276',
      name: 'Aruzhan Talgatkyzy',
      email: 'a_talgatkyzy@kbtu.kz',
      phone: '+7 (777) 678-90-12',
      city: 'Almaty',
      group: 'IS-22-1',
      gpa: '3.68',
      status: 'Active',
    },
  ];

  getProfile() {
    return this.profile;
  }

  updateProfile(data: Partial<typeof this.profile>) {
    this.profile = {
      ...this.profile,
      ...data,
    };
    return this.profile;
  }

  getStudents() {
    return this.students;
  }
}

