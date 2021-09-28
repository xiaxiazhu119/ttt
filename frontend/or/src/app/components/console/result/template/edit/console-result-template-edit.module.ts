import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';

import { ConsoleResultTemplateEditRoutingModule } from './console-result-template-edit-routing.module';
import { ConsoleResultTemplateEditComponent } from './console-result-template-edit.component';
import { SharedFormControlSelectionItemModule } from '@app/modules/public-api';


@NgModule({
  declarations: [ConsoleResultTemplateEditComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
    SharedFormControlSelectionItemModule,
    ConsoleResultTemplateEditRoutingModule
  ],
  exports: [ConsoleResultTemplateEditComponent]
})
export class ConsoleResultTemplateEditModule { }
