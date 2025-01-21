import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHistoryItemDto, HistoryItems } from './history-item.types';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class HistoryItemService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

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

    const id = `history_item-${Date.now().toString()}`;

    const historyItemModified: HistoryItems = {
      ...historyItem,
      comment: historyItem.comment || 'Объект был создан',
      id,
      before: currentObject ? currentObject.after : null,
      isArchived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.historyItems.push(historyItemModified);

    const { cron } = historyItem;

    const job = new CronJob(cron, () => {
      this.historyItems = this.historyItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isArchived: true,
          };
        }

        return item;
      });
      console.log(`Элемент ${id} был архивирован`);
    });
    this.schedulerRegistry.addCronJob(`item-delete-${id}`, job);
    job.start();

    return historyItemModified;
  };
}
