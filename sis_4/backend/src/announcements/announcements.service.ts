import { Injectable } from '@nestjs/common';

@Injectable()
export class AnnouncementsService {
  private announcements = [
    {
      id: 1,
      title: 'Midterm examination schedule announcement',
      body: 'Midterm exams will be conducted according to the academic calendar. Please check your personal schedule.',
      category: "Dean's office",
      date: '2026-11-08',
    },
    {
      id: 2,
      title: 'Library electronic resources update',
      body: 'Access to IEEE Xplore and SpringerLink has been renewed for all faculty and students.',
      category: 'Library',
      date: '2026-11-06',
    },
    {
      id: 3,
      title: 'Registration for upcoming academic competitions',
      body: 'Registration is open for the annual programming and cybersecurity championship.',
      category: 'Office Registry',
      date: '2026-11-04',
    },
    {
      id: 4,
      title: 'Career day and internships fair',
      body: 'Meet leading IT companies and submit your resume at the main atrium next week.',
      category: 'Exam commision',
      date: '2026-11-01',
    },
  ];

  findAll() {
    return this.announcements;
  }
}

