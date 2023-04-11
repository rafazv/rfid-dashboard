import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  routeActive!: string;

  constructor(private router: Router, private location: Location) {
    router.events.subscribe(() => {
      this.routeActive = this.router.url;
    });
  }

  backToList() {
    this.location.back();
  }
}
