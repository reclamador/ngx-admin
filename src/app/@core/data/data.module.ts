import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './user.service';

const SERVICES = [UserService];

@NgModule({
  imports: [CommonModule],
  providers: [...SERVICES]
})
export class DataModule {
  static forRoot(): ModuleWithProviders<DataModule> {
    return {
      ngModule: DataModule,
      providers: [...SERVICES]
    };
  }
}
