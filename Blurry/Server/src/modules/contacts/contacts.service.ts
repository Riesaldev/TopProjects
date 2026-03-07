import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from '../../database/entities/contact.entity';
import { User } from '../../database/entities/user.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactsRepo: Repository<Contact>,
  ) {}

  async getContactsForUser(userId: number) {
    const rawContacts = await this.contactsRepo.query(
      `SELECT c.id as link_id, c.created_at, u.id, u.display_name, u.imagen_perfil, u.bio, u.location, u.age, u.gender 
       FROM contacts c
       JOIN users u ON u.id = c.contact_id
       WHERE c.user_id = ?`,
      [userId]
    );
    return rawContacts;
  }

  async addContact(userId: number, contactId: number) {
    if (userId === contactId) throw new ConflictException("Cannot add yourself");
    
    const existing = await this.contactsRepo.findOne({ where: { user_id: userId, contact_id: contactId } });
    if (existing) throw new ConflictException("Contact already exists");

    const newContact = this.contactsRepo.create({ user_id: userId, contact_id: contactId });
    return this.contactsRepo.save(newContact);
  }

  async removeContact(userId: number, contactId: number) {
    await this.contactsRepo.delete({ user_id: userId, contact_id: contactId });
    return { success: true };
  }
}
