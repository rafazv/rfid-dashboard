import { Type } from 'class-transformer';
import { IsOptional, IsDate } from 'class-validator';

import { SearchDto } from '../../shared/dto/search.dto';

export class QueryDashboardDto extends SearchDto {
  @IsOptional()
  userId: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'invalid-date' })
  date: Date;
}
