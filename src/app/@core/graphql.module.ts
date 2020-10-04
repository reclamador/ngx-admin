import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Injectable } from '@angular/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { APP_DI_CONFIG } from '../app-config.module';

const uri = APP_DI_CONFIG.GRAPHQL_URL;
export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  };
}

export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
}

export interface ErrorType {
  field: string;
  messages: string[];
}

@Injectable({
  providedIn: 'root',
})
export class GQLResolver<T> implements Observer<T> {
  constructor() {}
  next(response) {
    if (response.errors) {
      for (const key in response.errors) {
        if (response.errors.hasOwnProperty(key)) {
          console.error(
            response.errors[key].messages.join(','),
            'Error en el campo: ' + response.errors[key].field
          );
        }
      }
    } else {
      return new Observable<T>(response);
    }
  }
  error(err) {
    console.error(err);
  }
  complete() {}
}

@NgModule({
  // exports: [ApolloModule, HttpLinkModule],
  imports: [BrowserModule, HttpClientModule, ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
    GQLResolver,
  ],
})
export class GraphQLModule {}
