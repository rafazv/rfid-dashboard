import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

export class PaginatorI18n extends MatPaginatorIntl {
  translate!: TranslateService;
  override itemsPerPageLabel = 'Itens por página';
  override nextPageLabel = 'Proxima página';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primeira página';
  override lastPageLabel = 'Última página';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    const of = this.translate ? this.translate.instant('paginator.of') : 'de';

    if (length === 0 || pageSize === 0) {
      return `0 ${of} ${length}`;
    }

    // tslint:disable-next-line:no-parameter-reassignment
    length = Math.max(length, 0);

    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;

    return `${startIndex + 1}  - ${endIndex} ${of} ${length}`;
  };

  injectTranslateService(translate: TranslateService) {
    this.translate = translate;

    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
      this.changes.next();
    });

    this.translateLabels();
  }

  translateLabels() {
    this.itemsPerPageLabel =
      this.translate.instant('paginator.items-per-page') ===
      'paginator.items-per-page'
        ? 'Itens por página'
        : this.translate.instant('paginator.items-per-page');
    this.nextPageLabel =
      this.translate.instant('paginator.next-page') === 'paginator.next-page'
        ? 'Proxima página'
        : this.translate.instant('paginator.next-page');
    this.previousPageLabel =
      this.translate.instant('paginator.previous-page') ===
      'paginator.previous-page'
        ? 'Página anterior'
        : this.translate.instant('paginator.previous-page');
    this.firstPageLabel =
      this.translate.instant('paginator.first-page') === 'paginator.first-page'
        ? 'Primeira página'
        : this.translate.instant('paginator.first-page');
    this.lastPageLabel =
      this.translate.instant('paginator.last-page') === 'paginator.last-page'
        ? 'Última página'
        : this.translate.instant('paginator.last-page');
  }
}
