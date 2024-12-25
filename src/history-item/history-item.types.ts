export interface IHistoryItems<T = object> {
  id: string;
  originalResource: {
    name: string;
    url: string;
  };
  after: T;
  before: T;

  createdAt: string;
  updatedAt: string;
}

export type THistoryItemShort = Omit<
  IHistoryItems,
  'createdAt' | 'updatedAt' | 'id'
>;
