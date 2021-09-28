import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCheckboxModule, MatTabsModule } from '@angular/material';

import { ConsoleOrganizationEditRoutingModule } from './console-organization-edit-routing.module';
import { ConsoleOrganizationEditComponent } from './console-organization-edit.component';
import { OrganizationEditModule, OrganizationUserModule, OrganizationResultListModule } from '@app/modules/public-api';


@NgModule({
  declarations: [ConsoleOrganizationEditComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCheckboxModule, MatTabsModule,
    OrganizationEditModule, OrganizationUserModule, OrganizationResultListModule,
    ConsoleOrganizationEditRoutingModule
  ],
  exports: [ConsoleOrganizationEditComponent]
})
export class ConsoleOrganizationEditModule { }
