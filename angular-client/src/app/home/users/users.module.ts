import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import {
  UsersComponent,
  UsersFormComponent,
  UsersListComponent,
  UsersService,
} from '.';

@NgModule({
  declarations: [UsersComponent, UsersListComponent, UsersFormComponent],
  imports: [CommonModule, SharedModule],
  providers: [UsersService],
})
export class UsersModule {}
