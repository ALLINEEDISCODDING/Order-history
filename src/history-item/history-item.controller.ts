import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { HistoryItemService } from './history-item.service';
import { CreateHistoryItemDto, HistoryItems } from './history-item.types';
import { ApiResponse } from '@nestjs/swagger';

const ORIGIONAL_RESOURCE_MOCK = {
  name: 'someName',
  url: 'http://some-site.ru',
};
const AFTER_MOCK = "['after array item']";
const BEFORE_MOCK = "['before array item']";
@Controller('history-item')
export class HistoryItemController {
  constructor(private readonly historyItemService: HistoryItemService) {}

  @Put()
  @ApiResponse({
    status: 200,
    description: 'Успех',
    example: new HistoryItems({
      id: 'some-item',
      originalResource: ORIGIONAL_RESOURCE_MOCK,
      after: AFTER_MOCK,
      before: BEFORE_MOCK,
    }),
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
    example: new HistoryItems({
      id: 'some-item',
      originalResource: ORIGIONAL_RESOURCE_MOCK,
      after: AFTER_MOCK,
      before: BEFORE_MOCK,
    }),
  })
  createHistoryItem(@Body() historyItem: CreateHistoryItemDto): HistoryItems {
    return this.historyItemService.addHistoryItem(historyItem);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Успешное получение истории',
    example: [
      new HistoryItems({
        id: 'some-id',
        originalResource: ORIGIONAL_RESOURCE_MOCK,
        after: AFTER_MOCK,
        before: BEFORE_MOCK,
      }),
    ],
  })
  getHistoryItems(): HistoryItems[] {
    return this.historyItemService.getHistoryItems();
  }
}
