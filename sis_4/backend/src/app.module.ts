import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module.js';
import { CoursesModule } from './courses/courses.module.js';
import { AssignmentsModule } from './assignments/assignments.module.js';
import { AnnouncementsModule } from './announcements/announcements.module.js';

@Module({
  imports: [
    StudentModule,
    CoursesModule,
    AssignmentsModule,
    AnnouncementsModule,
  ],
})
export class AppModule {}
