import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../../database/entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async findAll(userId?: number): Promise<Note[]> {
    if (typeof userId === 'number' && !Number.isNaN(userId)) {
      return this.notesRepository.find({ where: { user_id: userId }, order: { date: 'DESC' } });
    }
    return this.notesRepository.find({ order: { date: 'DESC' } });
  }

  async findOne(id: number): Promise<Note> {
    const note = await this.notesRepository.findOneBy({ id });
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    if (createNoteDto.contact_id) {
      const existing = await this.notesRepository.findOne({
        where: {
          user_id: createNoteDto.user_id,
          contact_id: createNoteDto.contact_id,
        },
      });

      if (existing) {
        existing.content = createNoteDto.content;
        return this.notesRepository.save(existing);
      }
    }

    const note = this.notesRepository.create(createNoteDto);
    return this.notesRepository.save(note);
  }

  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.findOne(id);
    Object.assign(note, updateNoteDto);
    return this.notesRepository.save(note);
  }

  async remove(id: number): Promise<void> {
    const note = await this.findOne(id);
    await this.notesRepository.remove(note);
  }
}
