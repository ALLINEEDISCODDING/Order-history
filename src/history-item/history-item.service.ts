import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IHistoryItems, THistoryItemShort } from './history-item.types';

@Injectable()
export class HistoryItemService {
  private historyItems: IHistoryItems[] = [];

  public editHistoryItem = (id: string, historyItem: THistoryItemShort) => {
    let findHistoryItem = this.historyItems.find((item) => item.id === id);

    if (!findHistoryItem)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    let historyItemModified: Partial<IHistoryItems> = {};

    this.historyItems = this.historyItems.map((item) => {
      if (item.id === id) {
        historyItemModified = {
          ...item,
          ...historyItem,
          updatedAt: new Date().toISOString(),
        };
        return historyItemModified as IHistoryItems;
      }

      return { ...item };
    });

    return historyItemModified as IHistoryItems;
  };

  public addHistoryItem = (historyItem: THistoryItemShort) => {
    const historyItemModified: IHistoryItems = {
      ...historyItem,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.historyItems.push(historyItemModified);

    return historyItemModified;
  };

  public getHistoryItems = (): IHistoryItems[] => {
    return this.historyItems;
  };
}
