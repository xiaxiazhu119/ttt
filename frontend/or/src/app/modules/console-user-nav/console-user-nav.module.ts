import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatMenuModule, MatDividerModule } from '@angular/material';

import { ConsoleUserNavComponent } from './console-user-nav.component';

@NgModule({
  declarations: [ConsoleUserNavComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatMenuModule, MatDividerModule,
  ],
  exports: [ConsoleUserNavComponent]
})
export class ConsoleUserNavModule { }
