import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AppIDVerifiedDirective } from './src/id-verified.module';
// import { AppAuditStatusDirective } from './src/audit-status.module';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    // AppIDVerifiedDirective,
    // AppAuditStatusDirective
  ],
  exports: [
    // AppIDVerifiedDirective,
    // AppAuditStatusDirective
  ],
})
export class AppDirectiveModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppDirectiveModule,
    };
  }
}
