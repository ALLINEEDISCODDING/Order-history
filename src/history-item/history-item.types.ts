import { ApiProperty } from '@nestjs/swagger';

class OriginalResourceDto {
  @ApiProperty({
    description: 'Название ресурса',
  })
  name: string;

  @ApiProperty({
    description: 'Url ресурса',
  })
  url: string;
}

export class CreateHistoryItemDto {
  constructor({ originalResource, after, before, comment }) {
    this.originalResource = originalResource;
    this.after = after;
    this.before = before;
    this.comment = comment;
  }
  @ApiProperty({
    description: 'Оригинальный ресурс с которого пришло изменение',
  })
  originalResource: OriginalResourceDto;

  @ApiProperty({
    description: 'Объект после изменения (формат JSON)',
  })
  after: string;

  @ApiProperty({
    description: 'Объект до изменения (формат JSON)',
  })
  before: string;

  @ApiProperty({
    description: 'Комментарий к истории',
    required: false,
  })
  comment: string;
}

export class HistoryItems extends CreateHistoryItemDto {
  constructor({ id, after, before, originalResource, comment }) {
    super({ after, before, originalResource, comment });

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
}
