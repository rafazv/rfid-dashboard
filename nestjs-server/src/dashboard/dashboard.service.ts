import { Injectable } from '@nestjs/common';

import { QueryDashboardDto } from './dto/query-dashboard.dto';
import { Between, DataSource } from 'typeorm';
import { QueryUtil } from 'src/utils';
import { Dashboard } from './entities/dashboard.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class DashboardService {
  readonly filterColumns = [{ column: 'rfid', type: 'string' }];

  constructor(private readonly dataSource: DataSource) {}

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
        "TO_CHAR(dashboard.createdAt, 'DD-MM-YYYY HH24:MM') as datetime, COUNT(*) as count, user.name, user.id",
      )
      .leftJoin(User, 'user', 'user.id = dashboard.userId')
      .where(where)
      .groupBy('user.name, user.id, datetime')
      .orderBy('datetime')
      .getRawMany();

    const labels = [];
    const datasets = [];

    const bgColors = [];

    result.forEach((item: any) => {
      const userIds = [];

      if (!labels.includes(item.datetime)) labels.push(item.datetime);
      if (!userIds.includes(item.id)) {
        userIds.push(item.id);
        bgColors.push({
          userId: item.id,
          color: `rgba(${this.generateRgbColor()},${this.generateRgbColor()},${this.generateRgbColor()},0.5)`,
        });
      }
    });

    result.forEach((item: any) => {
      const idxExistDate = labels.indexOf(item.datetime);
      const idxExistUser = datasets.findIndex(
        (data: any) => data.label === item.label,
      );

      if (idxExistDate >= 0 && idxExistUser >= 0) {
        datasets[idxExistUser].data[idxExistDate] = item.count;
      } else if (idxExistDate >= 0) {
        const data = new Array(labels.length).fill(null);
        data[idxExistDate] = item.count;
        datasets.push({
          label: item.name,
          backgroundColor: bgColors.find((user: any) => user.userId === item.id)
            .color,
          skipNull: true,
          data,
        });
      }
    });

    return { datasets, labels };
  }

  private generateRgbColor() {
    return Math.trunc(Math.random() * 255);
  }
}
