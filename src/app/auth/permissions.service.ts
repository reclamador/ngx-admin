import { NgxPermissionsService, NgxPermissionsConfigurationService } from 'ngx-permissions';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IPermissionsGQL {
  myPermissions: string[];
}

@Injectable({
  providedIn: 'root',
})
export class PermissionsGQL extends Query<IPermissionsGQL, {}> {
  document = gql`
    query myPermissions($app: String!) {
      myPermissions(service_Alias: $app)
    }
  `;
}

@Injectable()
export class PermissionsService {
  private APP_SERVICE = 'Setup';
  constructor(
    private permissionsGQL: PermissionsGQL,
    private npx: NgxPermissionsService,
    private npxConfig: NgxPermissionsConfigurationService
  ) {}
  get$(): Observable<string[]> {
    return this.permissionsGQL.watch({ app: this.APP_SERVICE }).valueChanges.pipe(
      map(({ data }) => {
        this.npxConfig.addPermissionStrategy('disable', (templateRef: TemplateRef<any>) => {
          templateRef.elementRef.nativeElement.nextSibling.setAttribute('disabled', true);
        });

        this.npx.loadPermissions(data.myPermissions || []);
        // console.log(data.myPermissions);
        return data.myPermissions;
      })
    );
  }
}

export function PermissionsProvider(ps: PermissionsService, nps: NgxPermissionsService) {
  return (): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      ps.get$().subscribe(
        (permissions) => {
          nps.loadPermissions(permissions || []);
          resolve(true);
        },
        (error) => {
          resolve(false);
        }
      );
    });
  };
}
