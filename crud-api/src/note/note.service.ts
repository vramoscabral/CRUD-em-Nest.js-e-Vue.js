import { Injectable } from '@nestjs/common';
import { NoteDto } from './dto/note.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class NoteService {
    constructor (private prisma: PrismaService) {}

    async create(data: NoteDto) {
        const note = await this.prisma.note.create({
            data
        })

        return note;
    }
}
