import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DeckDto } from './dto';

@Injectable()
export class DeckService {
  constructor(private prisma: PrismaService) {}

  async getAllDecks() {
    try {
      const allDecks =
        await this.prisma.deck.findMany();

      return allDecks;
    } catch (error) {
      console.log(error);
    }
  }

  async createADeck(dto: DeckDto) {
    try {
      if (!dto.name) {
        throw new NotFoundException(
          'Error on name',
        );
      }
      const deck = this.prisma.deck.create({
        data: {
          name: dto.name,
        },
      });
      return deck;
    } catch (error) {
      console.log(error);
    }
  }

  async updateDeckById(dto, deckId) {}

  async deleteDeckById(deckId) {}
}
