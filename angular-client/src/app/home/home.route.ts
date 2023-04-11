import { Route } from '@angular/router';

import { HomeComponent } from './home.component';

import { welcomeRoute } from './welcome/welcome.route';
import { usersRoute } from './users/users.route';

export const homeRoute: Route = {
  path: '',
  component: HomeComponent,
  children: [
    welcomeRoute,
    usersRoute,
    {
      path: '**',
      redirectTo: '/welcome',
    },
  ],
};
