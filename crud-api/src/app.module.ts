import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteService } from './note/note.service';
import { NoteController } from './note/note.controller';
import { NoteModule } from './note/note.module';

@Module({
  imports: [NoteModule],
  controllers: [AppController, NoteController],
  providers: [AppService, NoteService],
})
export class AppModule {}
