import { NbAuthModule } from '@nebular/auth';
import { PermissionsService, PermissionsProvider } from './auth/permissions.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgModule, InjectionToken, Injectable, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { environment } from '../environments/environment';
import { init, captureException } from '@sentry/browser';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { NgxPermissionsService } from 'ngx-permissions';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export class AppConfig {
  production: boolean;
  appTitle: string;
  API_URL: string;
  GRAPHQL_URL: string;
  ___PUBLIC_DSN___: string;
  firebase: object;
}

export const APP_DI_CONFIG: AppConfig = {
  production: environment.production,
  ___PUBLIC_DSN___: environment.___PUBLIC_DSN___,
  API_URL: environment.API_URL,
  GRAPHQL_URL: environment.GRAPHQL_URL,
  appTitle: 'MyApp',
  firebase: environment.firebase
};

/* Sentry */
if (APP_DI_CONFIG.production) {
  init({
    dsn: APP_DI_CONFIG.___PUBLIC_DSN___
  });
}

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    captureException(error.originalError || error);
    throw error;
  }
}

@NgModule({
  imports: [
    AngularFireModule.initializeApp(APP_DI_CONFIG.firebase),
    AngularFirestoreModule,
    AngularFireMessagingModule,
    NbAuthModule,
  ],
  providers: [
    PermissionsService,
    {
      provide: APP_INITIALIZER,
      useFactory: PermissionsProvider,
      deps: [PermissionsService, NgxPermissionsService],
      multi: true
    },
    {
      provide: APP_CONFIG,
      useValue: APP_DI_CONFIG
    },
    { provide: ErrorHandler, useClass: SentryErrorHandler }
  ]
})
export class AppConfigModule {}
