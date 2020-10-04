import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent, NbLogoutComponent } from '@nebular/auth';

import { RecLoginComponent } from './login/login.component';
import { RecRequestPasswordComponent } from './request-password/request-password.component';
import { RecResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: RecLoginComponent
      },
      {
        path: 'logout',
        component: NbLogoutComponent
      },
      {
        path: 'request-password',
        component: RecRequestPasswordComponent
      }
      // {
      //   path: 'reset-password',
      //   component: RecResetPasswordComponent
      // }
    ]
  }
];
@NgModule({
  imports: [ThemeModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [RecLoginComponent, RecRequestPasswordComponent, RecResetPasswordComponent]
})
export class AuthModule {}
