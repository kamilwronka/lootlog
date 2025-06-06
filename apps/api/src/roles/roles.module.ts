import { Module, forwardRef } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesEventsHandler } from 'src/roles/roles-events.handler';
import { RolesController } from './roles.controller';
import { MembersModule } from 'src/members/members.module';
import { GuildsModule } from 'src/guilds/guilds.module';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  imports: [forwardRef(() => GuildsModule), forwardRef(() => MembersModule)],
  controllers: [RolesController],
  providers: [RolesService, RolesEventsHandler, PrismaService],
  exports: [RolesService],
})
export class RolesModule {}
