import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { LoadService, ModalBasicComponent } from '../../../shared';
import { UsersService } from '../users.service';

export interface User {
  name: string;
  aptoNumber: string;
  rfid: string;
  status: string;
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, AfterViewInit {
  private ngUnsubscribe$ = new Subject();
  displayedColumns: string[] = [
    'name',
    'aptoNumber',
    'rfid',
    'status',
    'actions',
  ];
  dataSource!: MatTableDataSource<User>;

  pageIndex = 0;
  pageSize = 15;

  predicate = 'name';
  direction = 'asc';

  filterValue: string = '';
  listTotal!: number;

  noResultList = false;
  emptyList = false;

  titleMessage: string = '';
  secMessage: string = '';
  image: string = '';

  titleMessageEmptyList = 'users.no-users-text';
  secMessageEmptyList = 'users.empty-users-list';

  titleMessageFiltered = 'lists.no-result-title';
  secMessageFiltered = 'lists.no-result-message';

  constructor(
    private dialog: MatDialog,
    private usersService: UsersService,
    private loadService: LoadService
  ) {}

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.usersService.userList$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((users) => {
        this.initDataSource(users);
      });
  }

  ngAfterViewInit() {
    this.getUsers();
    this.paginator.page.subscribe(() => {
      this.getUsers();
    });

    this.paginator.pageIndex = this.pageIndex;
    this.paginator.pageSize = this.pageSize;
  }

  getUsers() {
    this.loadService.emitLoadEvent(true);

    this.usersService
      .findAll({
        page: this.paginator.pageIndex,
        size: this.paginator.pageSize,
        sort: this.predicate + ',' + this.sort.direction,
        ...(this.filterValue && { search: this.filterValue }),
      })
      .subscribe({
        next: () => this.loadService.emitLoadEvent(false),
        error: () => {
          this.dialog.open(ModalBasicComponent, {
            width: '400px',
            autoFocus: false,
            data: {
              body: 'user.list-error',
              hasCancel: false,
              title: 'general.error',
            },
          });
        },
      });
  }

  initDataSource(data: any) {
    if (this.dataSource == null) {
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(data.result);
    } else {
      this.dataSource.data = data.result;
    }

    this.listTotal = data.total;

    this.noResultList = false;
    this.emptyList = false;

    if (!data.result || data.result.length === 0) {
      this.showEmptyResult();
    }
  }

  applyFilter(search: any) {
    // this.filterValue = search.value.replace(SPECIAL_CHARACTERS, '').trim();

    this.paginator.pageIndex = 0;
    this.getUsers();
  }

  showEmptyResult() {
    this.noResultList = true;
    this.titleMessage = this.titleMessageFiltered;
    this.secMessage = this.secMessageFiltered;

    if (!this.filterValue) {
      this.emptyList = true;
      this.titleMessage = this.titleMessageEmptyList;
      this.secMessage = this.secMessageEmptyList;
    }
  }

  openDeleteDialog(user: any): void {
    const dialogRef = this.dialog.open(ModalBasicComponent, {
      width: '410px',
      autoFocus: false,
      data: {
        title: 'users.delete-user',
        body: 'users.delete-text',
        bodyParam: user,
        hasCancel: true,
      },
    });

    dialogRef.afterClosed().subscribe((deleteUser) => {
      if (!deleteUser) {
        return;
      }

      const dialogRefConfirm = this.dialog.open(ModalBasicComponent, {
        width: '480px',
        data: {
          title: 'users.delete-user',
          body: 'users.delete-confirm-text',
          bodyParam: user,
          hasCancel: true,
        },
      });

      dialogRefConfirm.afterClosed().subscribe((confirmDelete) => {
        if (!confirmDelete) {
          return;
        }
        this.loadService.emitLoadEvent(true);

        this.usersService.delete(user.id).subscribe({
          next: (data) => {
            this.openFeedbackDialog('general.done', 'users.deleted');
          },
          error: (err) => {
            this.openFeedbackDialog('general.error', 'error.delete-error');
          },
        });
      });
    });
  }

  openDisableDialog(user: any): void {
    const dialogRef = this.dialog.open(ModalBasicComponent, {
      width: '410px',
      autoFocus: false,
      data: {
        title: user.disabled ? 'users.enable-user' : 'users.disable-user',
        body: user.disabled ? 'users.enable-text' : 'users.disable-text',
        bodyParam: user,
        hasCancel: true,
      },
    });

    dialogRef.afterClosed().subscribe((confirmDisable) => {
      if (!confirmDisable) {
        return;
      }
      this.loadService.emitLoadEvent(true);

      this.usersService.disable(user.id).subscribe({
        next: (data) => {
          this.openFeedbackDialog(
            'general.done',
            user.disabled ? 'users.enabled' : 'users.disabled'
          );
        },
        error: (err) => {
          this.openFeedbackDialog('general.error', 'error.disable-error');
        },
      });
    });
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

    this.loadService.emitLoadEvent(false);

    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => this.getUsers(), 1000);
    });
  }
}
