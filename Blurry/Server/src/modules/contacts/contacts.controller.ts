import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('contacts')
@UseGuards(JwtAuthGuard)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  async getContacts(@Request() req) {
    // asumiendo que el UserID viene en req.user
    const userId = req.user?.id || req.user?.sub;
    return this.contactsService.getContactsForUser(userId);
  }

  @Get(':userId')
  async getContactsByUser(@Param('userId') userId: string) {
    return this.contactsService.getContactsForUser(Number(userId));
  }

  @Post()
  async addContact(@Request() req, @Body() body: { contact_id: number }) {
    const userId = req.user?.id || req.user?.sub || 1; // Fallback to 1 if no auth in dev
    return this.contactsService.addContact(userId, body.contact_id);
  }

  @Delete(':contactId')
  async removeContact(@Request() req, @Param('contactId') contactId: string) {
    const userId = req.user?.id || req.user?.sub || 1;
    return this.contactsService.removeContact(userId, Number(contactId));
  }
}
