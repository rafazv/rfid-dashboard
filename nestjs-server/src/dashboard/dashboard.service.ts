import { Injectable } from '@nestjs/common';

import { DashboardRepository } from './dashboard.repository';
import { QueryDashboardDto } from './dto/query-dashboard.dto';
import { Between } from 'typeorm';
import { QueryUtil } from 'src/utils';

@Injectable()
export class DashboardService {
  readonly filterColumns = [{ column: 'rfid', type: 'string' }];

  constructor(private dashboardRepository: DashboardRepository) {}

  async findAll(
    query: QueryDashboardDto = {
      userId: '',
      date: undefined,
    },
    page = 0,
    size = 10,
  ) {
    const { date, userId } = query;
    let dateFilter = undefined;

    if (date) {
      const start = new Date(date);
      const end = new Date(date);

      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);

      dateFilter = Between(start, end);
    }

    const where = QueryUtil.searchQuery(this.filterColumns, '', {
      userId,
      createdAt: dateFilter,
    });

    const [result, total] = await this.dashboardRepository.findAndCount({
      where,
      skip: page * size,
      take: size,
      relations: ['user'],
    });
    return { result, total };
  }
}
