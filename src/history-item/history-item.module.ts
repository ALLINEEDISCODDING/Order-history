import { Module } from '@nestjs/common';
import { HistoryItemController } from './history-item.controller';
import { HistoryItemService } from './history-item.service';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [HttpModule, ScheduleModule.forRoot()],
  controllers: [HistoryItemController],
  providers: [HistoryItemService],
})
export class HistoryItemModule {}
