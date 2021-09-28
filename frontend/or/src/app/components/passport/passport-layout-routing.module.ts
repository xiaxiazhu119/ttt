import { ModuleWithProviders } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';

import { PassportLayoutComponent } from './passport-layout.component';

import { PassportSignInComponent } from './sign-in/passport-sign-in.component';
// import { PassportSignUpComponent } from './sign-up/passport-sign-up.component';
import { PassportSignOutComponent } from './sign-out/passport-sign-out.component';


const routes: Routes = [
  {
    path: '',
    component: PassportLayoutComponent,
    children: [
      {
        path: 'sign-in',
        component: PassportSignInComponent
      },
      {
        path: 'sign-up',
        loadChildren: () => import('./sign-up/passport-sign-up.module').then(mod => mod.PassportSignUpModule),
      },
      // {
      //   path: 'forgot',
      //   loadChildren: () => import('./forgot/passport-forgot.module').then(mod => mod.PassportForgotModule),
      // },
      // {
      //   path: 'sign-up',
      //   component: PassportSignUpComponent
      // },
      {
        path: 'sign-out',
        component: PassportSignOutComponent
      },
    ]
  },
];

export const PassportLayoutRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
