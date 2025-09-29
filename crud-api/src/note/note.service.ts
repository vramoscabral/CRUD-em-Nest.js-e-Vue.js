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

    async findAll() {
        return await this.prisma.note.findMany();
    }

    async update(id: number, data: NoteDto) {
        await this.prisma.note.findUnique({
            where: {
                id,
            }
        });

        return await this.prisma.note.update({
            data,
            where: {
                id,
            }
        })
    }

    async delete(id: number) {
        await this.prisma.note.findUnique({
            where: {
                id,
            }
        });

        return await this.prisma.note.delete({
            where: {
                id,
            }
        })
    }
}
