import { NoteDto } from './dto/note.dto';
import { PrismaService } from 'src/database/prisma.service';
export declare class NoteService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: NoteDto): Promise<{
        note: string;
        title: string;
        id: number;
    }>;
    findAll(): Promise<{
        note: string;
        title: string;
        id: number;
    }[]>;
    update(id: number, data: NoteDto): Promise<{
        note: string;
        title: string;
        id: number;
    }>;
    delete(id: number): Promise<{
        note: string;
        title: string;
        id: number;
    }>;
}
