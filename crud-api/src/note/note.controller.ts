import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import type { NoteDto } from './dto/note.dto';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
    constructor (private readonly noteService: NoteService) {}

    @Post()
    async create(@Body() data: NoteDto) {
        return this.noteService.create(data);
    }

    @Get()
    async findAll() {
        return this.noteService.findAll();
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() data: NoteDto) {
        return this.noteService.update(Number(id), data);
    }


    @Delete(":id")
    async delete(@Param("id") id: string) {
        return this.noteService.delete(Number(id));
    }
}
