import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatSlideToggleModule, MatMenuModule } from '@angular/material';

import { BaseScComponent } from './base-sc.component';

@NgModule({
  declarations: [BaseScComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatSlideToggleModule, MatMenuModule,
  ],
  exports: [BaseScComponent]
})
export class BaseScModule { }
