import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent, homeRoute } from './';

import { SharedModule } from '../shared/shared.module';
import { WelcomeModule } from './welcome/welcome.module';
import { UsersModule } from './users/users.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([homeRoute]),
    WelcomeModule,
    UsersModule,
    DashboardModule,
  ],
})
export class HomeModule {}
