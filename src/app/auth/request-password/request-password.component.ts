import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { getDeepFromObject, NbUser } from '@nebular/auth';
import { NB_AUTH_OPTIONS, NbAuthService, NbAuthResult } from '@nebular/auth';

@Component({
  selector: 'ngx-request-password-page',
  templateUrl: './request-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecRequestPasswordComponent {
  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: NbUser = {};

  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router
  ) {
    this.redirectDelay = this.getConfigValue('forms.requestPass.redirectDelay');
    this.showMessages = this.getConfigValue('forms.requestPass.showMessages');
    this.strategy = this.getConfigValue('forms.requestPass.strategy');
  }

  requestPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.requestPassword(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
