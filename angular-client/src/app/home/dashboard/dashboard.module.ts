import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { DashboardComponent, DashboardService } from '.';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, SharedModule],
  providers: [DashboardService],
})
export class DashboardModule {}
