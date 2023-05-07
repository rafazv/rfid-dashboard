import { Injectable } from '@nestjs/common';

import { DashboardRepository } from './dashboard.repository';
import { SearchDto } from 'src/shared';
import { QueryUtil } from 'src/utils';
import { UserRepository } from 'src/users/user.repository';

@Injectable()
export class DashboardService {
  readonly filterColumns = [{ column: 'userId', type: 'uuid' }];

  constructor(
    private dashboardRepository: DashboardRepository,
    private userRepository: UserRepository,
  ) {}

  async findAll(searchQuery: SearchDto, page = 0, size = 10) {
    const { search } = searchQuery;
    const user = search
      ? await this.userRepository.findOne({ where: { rfid: search } })
      : null;

    const where = user ? { userId: user.id } : null;
    const [result, total] = await this.dashboardRepository.findAndCount({
      where,
      skip: page * size,
      take: size,
    });
    return { result, total };
  }
}
