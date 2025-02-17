import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Guild, Permission } from '@prisma/client';
import { GuildData } from 'src/shared/decorators/guild-data.decorator';
import { MemberPermissions } from 'src/shared/decorators/member-permissions.decorator';
import { UserId } from 'src/shared/decorators/user-id.decorator';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { Permissions } from 'src/shared/permissions/permissions.decorator';
import { PermissionsGuard } from 'src/shared/permissions/permissions.guard';
import { CreateTimerDto } from 'src/timers/dto/create-timer.dto';
import { TimersService } from 'src/timers/timers.service';

@UseGuards(AuthGuard)
@Controller('')
export class TimersController {
  constructor(private readonly timersService: TimersService) {}

  @Permissions(Permission.LOOTLOG_READ)
  @UseGuards(PermissionsGuard)
  @Get('/guilds/:guildId/timers')
  async getTimers(
    @Query('world') world: string,
    @MemberPermissions() permissions: Permission[],
    @GuildData() guild: Guild,
  ) {
    return this.timersService.getTimers(guild.id, world, permissions);
  }

  @Permissions(Permission.LOOTLOG_WRITE)
  @UseGuards(PermissionsGuard)
  @Post('/guilds/:guildId/timers')
  async createTimer(
    @Body() data: CreateTimerDto,
    @GuildData() guild: Guild,
    @UserId() userId: string,
  ) {
    return this.timersService.createTimer(userId, guild.id, data);
  }
}
