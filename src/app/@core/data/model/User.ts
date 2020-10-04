import { IRoleTemplate } from './Role';

export interface IUser {
  email: string;
  id: string;
  username: string;
  dateAdded: string;
  isActive: boolean;
  worker: IWorker;
  roles: IRoleTemplate[];
}
export interface IWorker {
  avatar?: string;
  id: string;
  name: string;
  surnames: string;
  email?: string;
  active?: boolean;
}

export class ComposeWorker {
  userId: string;
  id: string;
  name: string;
  surnames: string;
  email: string;
  avatar: string;
  active: boolean = false; // User active by default
  dateAdded: string;
  type: string;

  public constructor(init?) {
    Object.assign(this, init);
  }
}
