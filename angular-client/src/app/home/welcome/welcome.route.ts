import { Route } from '@angular/router';
import { WelcomeComponent } from './welcome.component';

export const welcomeRoute: Route = {
  path: 'welcome',
  component: WelcomeComponent,
  data: {
    authorities: [],
  },
  children: [],
};
