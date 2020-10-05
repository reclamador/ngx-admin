import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap, map, shareReplay, tap } from 'rxjs/operators';
import { UpdateUserGQL } from '../graphql/users-gql';
import { IUser, IWorker } from './model/User';

export interface User {
  date_joined: string;
  email: number;
  groups?: any[];
  id: string;
  is_active: Boolean;
  is_staff: Boolean;
  last_login: string;
  resource_uri: string;
  segments?: any[];
  username: string;
  worker: number;
}
export interface Worker {
  avatar: string;
  id: number;
  name: string;
  resource_uri: string;
  surnames: string;
}

export interface Permissions {
  client: { global: Permission[] };
  segment: { global: Permission[]; perObject: Permission[] };
}
export interface Permission {
  codename: string;
  objectId?: string;
  objectType?: string;
}

@Injectable()
export class UserService {
  entity = 'user';
  auxEntity = 'worker';

  worker: Worker;
  private username = '';
  // private APP_SERVICE = 'Setup';
  user: IUser = null;
  currentWorker$ = new BehaviorSubject<IWorker>(null);

  constructor(
    private http: HttpClient,
    // private getMyUserGQL: GetMyUserGQL,
    private updateUserGQL: UpdateUserGQL
  ) {
    this.username = localStorage.getItem('ngx_username');
  }

  getUserData$(username: string): Observable<User> {
    return this.http.get<User>(`/api/api2/v1/user/?username=${username}`).pipe(
      map((response: any) => {
        return response.objects[0];
      })
    );
  }

  getWorker$(workerId: number): Observable<Worker> {
    return this.http.get<Worker>(`/api/api2/v1/worker/${workerId}/`);
  }

  getUser$(): Observable<Worker> {
    if (this.worker) {
      return of(this.worker);
    }
    if (!this.username) return;

    return this.getUserData$(this.username).pipe(
      mergeMap((user: User) => this.getWorker$(user.worker)),
      map((worker) => (this.worker = worker)),
      shareReplay(1)
    );

    // GET user data using GQL
    //   return this.getMyUserGQL.watch({ app: this.APP_SERVICE }).valueChanges.pipe(
    //     map(({ data }) => {
    //       this.user = data.myUser;
    //       this.currentWorker$.next(this.user.worker);
    //       return this.user;
    //     }),
    //     share()
    //   );
  }

  updateUser$(worker): Observable<IWorker> {
    return this.updateUserGQL
      .mutate({
        id: this.user.worker.id,
        name: worker.name,
        surnames: worker.surnames,
        email: worker.email,
      })
      .pipe(
        map(({ data }) => {
          return data.createOrUpdateWorker;
        }),
        tap((workerInfo) => this.currentWorker$.next(workerInfo))
      );
  }
}
