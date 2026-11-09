import { Controller, Get } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service.js';

@Controller()
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Get('announcements')
  findAll() {
    return this.announcementsService.findAll();
  }

  @Get('posts')
  findPosts() {
    return this.announcementsService.findAll();
  }
}

