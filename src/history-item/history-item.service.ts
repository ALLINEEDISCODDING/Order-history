import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHistoryItemDto, HistoryItems } from './history-item.types';

@Injectable()
export class HistoryItemService {
  private historyItems: HistoryItems[] = [];

  public editHistoryItem = (id: string, historyItem: CreateHistoryItemDto) => {
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

  public addHistoryItem = (historyItem: CreateHistoryItemDto) => {
    const historyItemModified: HistoryItems = {
      ...historyItem,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.historyItems.push(historyItemModified);

    return historyItemModified;
  };

  public getHistoryItems = (): HistoryItems[] => {
    return this.historyItems;
  };
}
