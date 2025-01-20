import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { HistoryItemService } from './history-item.service';
import { CreateHistoryItemDto, HistoryItems } from './history-item.types';
import { ApiResponse } from '@nestjs/swagger';

const AFTER_MOCK = "['after array item']";
const HISTORY_ITEM_MOCK = new HistoryItems({
  id: 'some-item-id',
  after: AFTER_MOCK,
  comment: 'Какой-нибудь комментарий',
});
@Controller('history-item')
export class HistoryItemController {
  constructor(private readonly historyItemService: HistoryItemService) {}

  @Put()
  @ApiResponse({
    status: 200,
    description: 'Успех',
    example: HISTORY_ITEM_MOCK,
  })
  @ApiResponse({
    status: 404,
    description: 'Не найдено',
    example: new HttpException('Объект не найден', HttpStatus.NOT_FOUND),
  })
  editHistoryItem(
    @Query('hisory-item-id') id: string,
    @Body() historyItem: CreateHistoryItemDto,
  ) {
    return this.historyItemService.editHistoryItem(id, historyItem);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Успех',
    example: HISTORY_ITEM_MOCK,
  })
  createHistoryItem(@Body() historyItem: CreateHistoryItemDto) {
    return this.historyItemService.addHistoryItem(historyItem);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Успешное получение историй',
    example: [HISTORY_ITEM_MOCK],
  })
  getHistoryItems(): HistoryItems[] {
    return this.historyItemService.getHistoryItems();
  }

  @Get(':history_item_id')
  @ApiResponse({
    status: 200,
    description: 'Успешное получение истории',
    example: HISTORY_ITEM_MOCK,
  })
  @ApiResponse({
    status: 404,
    description: 'Не найдено',
    example: new HttpException('Объект не найден', HttpStatus.NOT_FOUND),
  })
  getById(@Param('history_item_id') history_item_id: string) {
    return this.historyItemService.getById(history_item_id);
  }
}
