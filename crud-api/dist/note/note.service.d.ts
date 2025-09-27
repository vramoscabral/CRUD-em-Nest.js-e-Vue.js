import { NoteDto } from './dto/note.dto';
import { PrismaService } from 'src/database/prisma.service';
export declare class NoteService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: NoteDto): Promise<{
        note: string;
        id: number;
    }>;
}
