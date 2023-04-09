import { Route } from '@angular/router';

import { HomeComponent } from './home.component';

import { welcomeRoute } from './welcome/welcome.route';

export const homeRoute: Route = {
  path: '',
  component: HomeComponent,
  // children: [
  //   welcomeRoute,
  //   {
  //     path: '',
  //     redirectTo: '/welcome',
  //   },
  // ],
};
