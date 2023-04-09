import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  routeActive: string = '';

  constructor(private router: Router) {
    router.events.subscribe(() => {
      this.routeActive = this.router.url;
    });
  }
}
