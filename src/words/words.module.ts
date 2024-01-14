import { Module } from '@nestjs/common';
import { WordController } from './words.controller';
import { WordService } from './word.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [WordController],
  providers: [WordService],
  imports: [PrismaModule],
})
export class WordsModule {}
