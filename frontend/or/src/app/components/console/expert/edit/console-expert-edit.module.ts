import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatSlideToggleModule } from '@angular/material';

import { SharedUserEditFormModule } from '@app/modules/public-api';

import { ConsoleExpertEditRoutingModule } from './console-expert-edit-routing.module';
import { ConsoleExpertEditComponent } from './console-expert-edit.component';

@NgModule({
  declarations: [ConsoleExpertEditComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatSlideToggleModule,
    SharedUserEditFormModule,
    ConsoleExpertEditRoutingModule
  ],
  exports: [ConsoleExpertEditComponent]
})
export class ConsoleExpertEditModule { }
