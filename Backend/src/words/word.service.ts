import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WordDto } from './dto';

@Injectable()
export class WordService {
  constructor(private prisma: PrismaService) {}

  async getAllWords() {
    const getAllWords =
      await this.prisma.words.findMany();
    return getAllWords.map((word) => word.text);
  }

  async addWord(dto: WordDto) {
    if (dto.word) {
    }
    const newWord =
      await this.prisma.words.create({
        data: {
          text: dto.word,
        },
      });
    return newWord;
  }

  async deleteWordbyId(wordId: number) {
    const word =
      await this.prisma.words.findUnique({
        where: {
          id: wordId,
        },
      });

    console.log('Found word:', word);

    if (!word) {
      throw new NotFoundException(
        'Word not found',
      );
    }

    await this.prisma.words.delete({
      where: {
        id: wordId,
      },
    });

    return 'Word Deleted!';
  }
}