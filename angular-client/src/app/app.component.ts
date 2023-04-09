import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

import { LoadService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private ngUnsubscribe$ = new Subject<void>();

  loading = false;

  constructor(
    private translate: TranslateService,
    private loadService: LoadService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('pt');

    this.loadService.isLoading$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((isLoading) => {
        this.loading = isLoading;
        this.changeDetector.detectChanges();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
