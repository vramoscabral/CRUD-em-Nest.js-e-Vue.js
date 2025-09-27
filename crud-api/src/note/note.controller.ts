import { Body, Controller, Post } from '@nestjs/common';
import type { NoteDto } from './dto/note.dto';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
    constructor (private readonly noteService: NoteService) {}

    @Post()
    async create(@Body() data: NoteDto) {
        return this.noteService.create(data);
    }
}
