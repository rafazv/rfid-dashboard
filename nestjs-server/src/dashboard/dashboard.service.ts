import { Injectable } from '@nestjs/common';

import { DashboardRepository } from './dashboard.repository';
import { QueryDashboardDto } from './dto/query-dashboard.dto';
import { Between, DataSource } from 'typeorm';
import { QueryUtil } from 'src/utils';
import { Dashboard } from './entities/dashboard.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class DashboardService {
  readonly filterColumns = [{ column: 'rfid', type: 'string' }];

  constructor(
    private readonly dashboardRepository: DashboardRepository,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(
    query: QueryDashboardDto = {
      userId: '',
      date: undefined,
    },
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

    const result = await this.dataSource
      .createQueryBuilder(Dashboard, 'dashboard')
      .select(
        "TO_CHAR(dashboard.createdAt, 'YYYY-MM-DD HH24') as datetime, COUNT(*) as count, user.name",
      )
      .leftJoin(User, 'user', 'user.id = dashboard.userId')
      .where(where)
      .groupBy('user.name, datetime')
      .getRawMany();

    const labels = [];
    const datasets = [];
    result.forEach((item: any) => {
      datasets.push({ label: item.name, data: item.count });
      labels.push(item.datetime);
    });

    return { datasets, labels };
    // return { result };
  }
}
