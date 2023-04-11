import { Route } from '@angular/router';

import { UsersComponent, UsersFormComponent, UsersListComponent } from '.';

export const usersRoute: Route = {
  path: 'users',
  component: UsersComponent,
  children: [
    {
      path: 'register',
      component: UsersFormComponent,
    },
    {
      path: 'edit/:id',
      component: UsersFormComponent,
    },
    {
      path: '',
      component: UsersListComponent,
    },
  ],
};
