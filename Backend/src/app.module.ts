import { Module } from '@nestjs/common';
import { WordsModule } from './words/words.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { DeckModule } from './deck/deck.module';

@Module({
  imports: [WordsModule, UserModule, PrismaModule, DeckModule],
})
export class AppModule {}
