import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatSlideToggleModule } from '@angular/material';

import { SharedFormControlSelectionItemComponent } from './shared-form-control-selection-item.component';

@NgModule({
  declarations: [SharedFormControlSelectionItemComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatSlideToggleModule,
  ],
  exports: [SharedFormControlSelectionItemComponent]
})
export class SharedFormControlSelectionItemModule { }
