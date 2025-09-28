import type { NoteDto } from './dto/note.dto';
import { NoteService } from './note.service';
export declare class NoteController {
    private readonly noteService;
    constructor(noteService: NoteService);
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
    update(id: string, data: NoteDto): Promise<{
        note: string;
        title: string;
        id: number;
    }>;
    delete(id: string): Promise<{
        note: string;
        title: string;
        id: number;
    }>;
}
