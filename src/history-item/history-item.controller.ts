import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { HistoryItemService } from './history-item.service';
import { IHistoryItems, THistoryItemShort } from './history-item.types';

@Controller('history-item')
export class HistoryItemController {
  constructor(private readonly historyItemService: HistoryItemService) {}

  @Put()
  editHistoryItem(
    @Query('hisory-item-id') id: string,
    @Body() historyItem: THistoryItemShort,
  ) {
    return this.historyItemService.editHistoryItem(id, historyItem);
  }

  @Post()
  createHistoryItem(@Body() historyItem: THistoryItemShort): IHistoryItems {
    return this.historyItemService.addHistoryItem(historyItem);
  }

  @Get()
  getHistoryItems(): IHistoryItems[] {
    return this.historyItemService.getHistoryItems();
  }
}
