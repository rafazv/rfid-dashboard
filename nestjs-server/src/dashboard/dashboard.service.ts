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

  async getData(
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
        "TO_CHAR(dashboard.createdAt, 'DD-MM-YYYY HH24:MM') as datetime, COUNT(*) as count, user.name",
      )
      .leftJoin(User, 'user', 'user.id = dashboard.userId')
      .where(where)
      .groupBy('user.name, datetime')
      .orderBy('datetime')
      .getRawMany();

    const labels = [];
    const datasets = [];
    result.forEach((item: any) => {
      if (!labels.includes(item.datetime)) labels.push(item.datetime);
    });

    result.forEach((item: any) => {
      const idx = labels.indexOf(item.datetime);
      const idx2 = datasets.findIndex((data: any) => data.label === item.label);

      if (idx >= 0 && idx2 >= 0) {
        datasets[idx2].data[idx] = item.count;
      } else if (idx >= 0) {
        const data = new Array(labels.length).fill(null);
        data[idx] = item.count;
        datasets.push({
          label: item.name,
          data,
          skipNull: true,
        });
      }
    });

    return { datasets, labels };
  }
}
