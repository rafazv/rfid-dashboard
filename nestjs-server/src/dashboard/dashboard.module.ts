import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from 'src/shared/shared.module';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { DashboardRepository } from './dashboard.repository';
import { UserRepository } from 'src/users/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DashboardRepository]), SharedModule],
  controllers: [DashboardController],
  providers: [DashboardService, DashboardRepository, UserRepository],
  exports: [DashboardService, DashboardRepository],
})
export class DashboardModule {}
