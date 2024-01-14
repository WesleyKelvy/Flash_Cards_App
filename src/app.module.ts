import { Module } from '@nestjs/common';
import { WordsModule } from './words/words.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [WordsModule, UserModule, PrismaModule],
})
export class AppModule {}
