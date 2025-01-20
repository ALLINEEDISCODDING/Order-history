import { ApiProperty } from '@nestjs/swagger';

export class CreateHistoryItemDto {
  constructor({ after, comment }) {
    this.after = after;
    this.comment = comment;
  }

  @ApiProperty({
    description: 'Id объекта по которому происходит связь полей after и before',
  })
  objectId: string;

  @ApiProperty({
    description: 'Объект после изменения (формат JSON)',
  })
  after: string;

  @ApiProperty({
    description: 'Комментарий к истории',
    required: false,
  })
  comment: string;
}

export class HistoryItems extends CreateHistoryItemDto {
  constructor({ id, after, comment }) {
    super({ after, comment });

    this.id = id;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty({
    description: 'Объект до изменения (формат JSON)',
  })
  before: string;
}
