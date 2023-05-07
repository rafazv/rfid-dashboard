import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatPaginatorModule,
  MatPaginatorIntl,
} from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';

import {
  ApiService,
  NoWhiteSpaceDirective,
  OnlyNumbersDirective,
  ModalBasicComponent,
  LoadingComponent,
  PaginatorI18n,
  EmptyListComponent,
} from './';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    TranslateModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSortModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatChipsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  declarations: [
    NoWhiteSpaceDirective,
    OnlyNumbersDirective,
    LoadingComponent,
    ModalBasicComponent,
    EmptyListComponent,
  ],
  exports: [
    FormsModule,
    HttpClientModule,
    TranslateModule,
    RouterModule,
    NoWhiteSpaceDirective,
    OnlyNumbersDirective,
    LoadingComponent,
    ModalBasicComponent,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatCheckboxModule,
    EmptyListComponent,
    ReactiveFormsModule,
    MatChipsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [
    ApiService,
    {
      provide: MatPaginatorIntl,
      useFactory: (translate: any) => {
        const service = new PaginatorI18n();
        service.injectTranslateService(translate);
        return service;
      },
      deps: [TranslateService],
    },
    provideNgxMask(),
  ],
})
export class SharedModule {}
