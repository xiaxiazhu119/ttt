import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassportSignInComponent } from './passport-sign-in.component';

const routes: Routes = [{
  path: '',
  component: PassportSignInComponent
}];

// export const PassportSignInRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassportSignInRoutingModule { }
