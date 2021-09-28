import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassportSignUpComponent } from './passport-sign-up.component';

const routes: Routes = [{
  path: '',
  component: PassportSignUpComponent
}];

export const PassportSignUpRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
