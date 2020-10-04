import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
import { IUser, IWorker } from './model/User';
import { map, tap, share } from 'rxjs/operators';
import { GetMyUserGQL, UpdateUserGQL } from '../graphql/users-gql';

@Injectable()
export class UserService {
  private username = '';
  private APP_SERVICE = 'Setup';
  user: IUser = null;
  currentWorker$ = new BehaviorSubject<IWorker>(null);

  constructor(
    private getMyUserGQL: GetMyUserGQL,
    private updateUserGQL: UpdateUserGQL,
    private storage: StorageMap,
    private router: Router
  ) {
    this.storage.get('username').subscribe((user: string) => this.username = user);
  }

  getUser$(): Observable<IUser> {
    if (!this.username) {
      this.router.navigate(['auth/login']);
      return new Observable<any>();
    }

    return this.getMyUserGQL.watch({ app: this.APP_SERVICE }).valueChanges.pipe(
      map(({ data }) => {
        this.user = data.myUser;
        this.currentWorker$.next(this.user.worker);
        return this.user;
      }),
      share()
    );
  }

  updateUser$(worker): Observable<IWorker> {
    return this.updateUserGQL
      .mutate({
        id: this.user.worker.id,
        name: worker.name,
        surnames: worker.surnames,
        email: worker.email
      })
      .pipe(
        map(({ data }) => {
          return data.createOrUpdateWorker;
        }),
        tap(workerInfo => this.currentWorker$.next(workerInfo))
      );
  }
}
