import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import localeBr from '@angular/common/locales/pt';
import { registerLocaleData, DatePipe } from '@angular/common';

import { HttpClient } from '@angular/common/http';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoadService } from './shared';
import { SharedModule } from './shared/shared.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

registerLocaleData(localeBr, 'pt');

export class DynamicLocaleId extends String {
  constructor(protected service: TranslateService) {
    super('');
  }

  override toString() {
    return this.service.currentLang ? this.service.currentLang : 'pt';
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    // Provider to update angular components locale id based on translate service
    { provide: LOCALE_ID, useClass: DynamicLocaleId, deps: [TranslateService] },
    // same across all app
    DatePipe,
    LoadService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
