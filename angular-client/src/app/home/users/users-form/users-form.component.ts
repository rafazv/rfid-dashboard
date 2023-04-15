import {
  Component,
  ChangeDetectorRef,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import {
  LoadService,
  ModalBasicComponent,
  NoWhiteSpaceDirective,
} from '../../../shared';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
  providers: [NoWhiteSpaceDirective],
})
export class UsersFormComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private usersService: UsersService,
    private routerParam: ActivatedRoute,
    private location: Location,
    private loadService: LoadService
  ) {}

  user: any = {};
  error = '';

  @ViewChild('rfid') rfid!: NgModel;

  ngOnInit(): void {
    const id = this.routerParam.snapshot.paramMap.get('id');

    if (id) {
      this.getUser(id);
    }
  }

  getUser(id: string) {
    this.loadService.emitLoadEvent(true);

    this.usersService.findOne(id).subscribe({
      next: (user: any) => {
        this.user = user;
        this.loadService.emitLoadEvent(false);
      },
      error: () => {
        this.loadService.emitLoadEvent(false);
        this.openFeedbackDialog('general.error', 'register.not-found');
      },
    });
  }

  saveUser() {
    this.loadService.emitLoadEvent(true);

    this.user = { ...this.user, aptoNumber: this.user.aptoNumber.toString() };

    this.usersService.create(this.user).subscribe({
      next: () => {
        this.loadService.emitLoadEvent(false);
        this.openFeedbackDialog('general.done', 'register.saved');
      },
      error: (err) => {
        const message = err.error ? err.error.message : '';
        this.checkError(message);
      },
    });
  }

  updateUser() {
    this.loadService.emitLoadEvent(true);

    this.user = { ...this.user, aptoNumber: this.user.aptoNumber.toString() };

    this.usersService.update(this.user).subscribe({
      next: () => {
        this.loadService.emitLoadEvent(false);
        this.openFeedbackDialog('general.done', 'register.saved');
      },
      error: (err) => {
        const message = err.error ? err.error.message : '';
        this.checkError(message);
      },
    });
  }

  checkError(message: string) {
    if (message === 'rfid-exists') {
      this.rfid.control.setErrors({ exists: true });
      this.loadService.emitLoadEvent(false);
    } else {
      this.loadService.emitLoadEvent(false);
      this.dialog.open(ModalBasicComponent, {
        width: '400px',
        autoFocus: false,
        data: {
          body: 'error.save-error',
          hasCancel: false,
          title: 'general.error',
        },
      });
    }

    this.error = message;
  }

  openFeedbackDialog(title: string, body: string) {
    const dialogRef = this.dialog.open(ModalBasicComponent, {
      width: '400px',
      autoFocus: false,
      data: {
        body,
        hasCancel: false,
        title,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => this.location.back(), 1000);
    });
  }

  backToList() {
    this.location.back();
  }
}
