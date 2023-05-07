import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Dashboard } from './entities/dashboard.entity';

@Injectable()
export class DashboardRepository extends Repository<Dashboard> {
  constructor(private dataSource: DataSource) {
    super(Dashboard, dataSource.createEntityManager());
  }
}
