import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { WordDto } from './dto';
import { WordService } from './word.service';

@Controller('word')
export class WordController {
  constructor(private wordService: WordService) {}
  @Get()
  getAllWords() {
    console.log('All Words shows up!');
    return this.wordService.getAllWords();
  }

  @Post('addWord')
  addWord(@Body() dto: WordDto) {
    console.log({ dto });
    return this.wordService.addWord(dto);
  }

  @Delete(':id')
  deleteWordbyId(
    @Param('id', ParseIntPipe)
    wordId: number,
  ) {
    console.log({ wordId });
    return this.wordService.deleteWordbyId(
      wordId,
    );
  }
}
