import type { NoteDto } from './dto/note.dto';
import { NoteService } from './note.service';
export declare class NoteController {
    private readonly noteService;
    constructor(noteService: NoteService);
    create(data: NoteDto): Promise<{
        note: string;
        id: number;
    }>;
}
