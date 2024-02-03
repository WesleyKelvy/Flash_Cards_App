import {
  Body,
  Controller,
  Patch,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { DeckService } from './deck.service';
import { DeckDto } from './dto';

@Controller('deck')
export class DeckController {
  constructor(private deckService: DeckService) {}

  @Get()
  getAllDecks() {
    console.log('Getting ALL Decks!');
    return this.deckService.getAllDecks();
  }

  @Post()
  createADeck(@Body() dto: DeckDto) {
    console.log('Creating a Deck!');
    return this.deckService.createADeck(dto);
  }

  @Patch(':id')
  updateDeckById(
    @Body() dto: DeckDto,
    @Param('id', ParseIntPipe) deckId: number,
  ) {
    console.log('Updating Deck!');
    return this.deckService.updateDeckById(
      dto,
      deckId,
    );
  }

  @Delete(':id')
  deleteDeckById(
    @Param('id', ParseIntPipe) deckId: number,
  ) {
    console.log('Deleting a Deck!');
    return this.deckService.deleteDeckById(
      deckId,
    );
  }
}
