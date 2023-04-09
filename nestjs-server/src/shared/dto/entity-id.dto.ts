import { IsUUID } from 'class-validator';

export class EntityIdDto {
  @IsUUID()
  id: string;
}
