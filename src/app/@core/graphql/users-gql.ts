import { ComposeWorker } from '../data/model/User';
import { Injectable } from '@angular/core';
import { Query, Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { IUser } from '../data/model/User';
import { ErrorType } from '../graphql.module';

export interface ImyUserGQL {
  myUser: IUser;
  myPermissions: string[];
}

export interface WorkerGQLResponse extends ComposeWorker {
  errors: ErrorType[];
}

export interface UserGQLResponse {
  user: IUser;
}
export interface UsersGQLResponse {
  users: {
    count: number;
    objects: IUser[];
  };
}
export interface UpdateUserMutationResponse {
  createOrUpdateWorker: WorkerGQLResponse;
}

export interface UpdateUserVariables {
  id: string;
  userId?: string;
  name: string;
  surnames: string;
  email: string;
  errors?: {
    field: string;
    messages: string[];
  };
}

export interface ActivationUserMutation {
  setUserActivationStatus: ActivationUserVariables;
}

export interface ActivationUserMutationResponse {
  data: {
    setUserActivationStatus: ActivationUserVariables;
  };
}
export interface ActivationUserVariables {
  id: string;
  isActive: string;
  errors?: {
    field: string;
    messages: string[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class GetMyUserGQL extends Query<ImyUserGQL, {}> {
  document = gql`
    query myUser($app: String!) {
      myUser {
        id
        username
        email
        dateAdded
        worker {
          id
          name
          surnames
          avatar
        }
      }
      myPermissions(service_Alias: $app)
    }
  `;
}

/* Users */
@Injectable({
  providedIn: 'root'
})
export class GetUsersGQL extends Query<UsersGQLResponse, {}> {
  document = gql`
    query UsersGQL(
      $isActive: Boolean
      $isWorkerNull: Boolean
      $searchText: String
      $limit: Int
      $offset: Int
    ) {
      users(
        worker_Isnull: $isWorkerNull
        isActive: $isActive
        searchText: $searchText
        limit: $limit
        offset: $offset
      ) {
        count
        objects {
          id
          email
          username
          isActive
          dateAdded
          worker {
            id
            name
            surnames
          }
        }
      }
    }
  `;
}

@Injectable({
  providedIn: 'root'
})
export class GetUserGQL extends Query<UserGQLResponse, { id: string }> {
  document = gql`
    query UserGQL($id: ID!) {
      user(id: $id) {
        id
        email
        username
        isActive
        dateAdded
        roles {
          id
          template {
            id
            name
            area {
              id
              name
            }
          }
          segment {
            id
            name
          }
        }
        worker {
          id
          name
          surnames
          avatar
        }
      }
    }
  `;
}

@Injectable({
  providedIn: 'root'
})
export class CreateUserGQL extends Mutation<UpdateUserMutationResponse, UpdateUserVariables> {
  document = gql`
    mutation updateUser($name: String!, $surnames: String!, $email: String!) {
      createOrUpdateWorker(input: { surnames: $surnames, name: $name, email: $email }) {
        id
        userId
        name
        surnames
        email
        errors {
          field
          messages
        }
      }
    }
  `;
}

@Injectable({
  providedIn: 'root'
})
export class UpdateUserGQL extends Mutation<UpdateUserMutationResponse, UpdateUserVariables> {
  document = gql`
    mutation updateUser($id: Int, $name: String!, $surnames: String!, $email: String!) {
      createOrUpdateWorker(input: { id: $id, surnames: $surnames, name: $name, email: $email }) {
        id
        userId
        name
        surnames
        email
      }
    }
  `;
}

@Injectable({
  providedIn: 'root'
})
export class ActivationUserGQL extends Mutation<ActivationUserMutation, ActivationUserVariables> {
  document = gql`
    mutation setUserActivationStatus($id: Int, $isActive: Boolean) {
      setUserActivationStatus(input: { id: $id, isActive: $isActive }) {
        id
        isActive
        errors {
          field
          messages
        }
      }
    }
  `;
}
