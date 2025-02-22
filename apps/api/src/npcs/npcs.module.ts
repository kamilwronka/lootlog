import { Module } from '@nestjs/common';
import { NpcsController } from './npcs.controller';
import { NpcsService } from './npcs.service';
import { MembersModule } from 'src/members/members.module';
import { DiscordModule } from 'src/discord/discord.module';
import { GuildsModule } from 'src/guilds/guilds.module';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  imports: [MembersModule, DiscordModule, GuildsModule],
  controllers: [NpcsController],
  providers: [NpcsService, PrismaService],
  exports: [NpcsService],
})
export class NpcsModule {}
