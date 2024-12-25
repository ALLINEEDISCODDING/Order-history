import { Module } from '@nestjs/common';
import { HistoryItemController } from './history-item.controller';
import { HistoryItemService } from './history-item.service';

@Module({
  controllers: [HistoryItemController],
  providers: [HistoryItemService],
})
export class HistoryItemModule {}
