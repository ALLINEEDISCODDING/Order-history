// @ts-nocheck
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHistoryItemDto, HistoryItems } from './history-item.types';
import { HttpService } from '@nestjs/axios';
import { sort } from 'radash';

@Injectable()
export class HistoryItemService {
  constructor(private readonly httpService: HttpService) {}

  private historyItems: HistoryItems[] = [];

  public getHistoryItems = (): HistoryItems[] => {
    return this.historyItems;
  };

  public getById = (id: string): HistoryItems => {
    const finded = this.historyItems.find((item) => item.id === id);

    if (!finded)
      throw new HttpException('Объект не найден', HttpStatus.NOT_FOUND);

    return finded;
  };

  public editHistoryItem = async (
    id: string,
    historyItem: CreateHistoryItemDto,
  ) => {
    let findHistoryItem = this.historyItems.find((item) => item.id === id);

    if (!findHistoryItem)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    let historyItemModified: Partial<HistoryItems> = {};

    this.historyItems = this.historyItems.map((item) => {
      if (item.id === id) {
        historyItemModified = {
          ...item,
          ...historyItem,
          updatedAt: new Date().toISOString(),
        };
        return historyItemModified as HistoryItems;
      }

      return { ...item };
    });

    return historyItemModified as HistoryItems;
  };

  public addHistoryItem = async (historyItem: CreateHistoryItemDto) => {
    let currentObject = this.historyItems.find(
      (item) => item.objectId === historyItem.objectId,
    );

    const historyItemModified: HistoryItems = {
      ...historyItem,
      comment: historyItem.comment || 'Объект был создан',
      id: `history_item-${Date.now().toString()}`,
      before: currentObject ? currentObject.after : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.historyItems.push(historyItemModified);

    return historyItemModified;
  };
}
