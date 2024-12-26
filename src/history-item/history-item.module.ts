import { Module } from '@nestjs/common';
import { HistoryItemController } from './history-item.controller';
import { HistoryItemService } from './history-item.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [HistoryItemController],
  providers: [HistoryItemService],
})
export class HistoryItemModule {}
