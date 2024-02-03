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
    try {
      const allWords =
        await this.prisma.words.findMany();

      if (!allWords) {
        throw new NotFoundException(
          'Empty database!',
        );
      }
      return allWords.map((word) => word.text);
    } catch (error) {
      console.log(error);
    }
  }

  async addWord(dto: WordDto) {
    if (!dto.word) {
      throw new NotFoundException(
        'Empty database!',
      );
    }
    const newWord =
      await this.prisma.words.create({
        data: {
          text: dto.word,
          deck: { connect: { id: dto.deckId } },
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
