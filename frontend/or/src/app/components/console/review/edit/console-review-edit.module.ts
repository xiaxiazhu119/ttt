import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';

import { SharedResultViewModule, SharedScoreItemListModule } from '@app/modules/public-api';

import { ConsoleReviewEditRoutingModule } from './console-review-edit-routing.module';
import { ConsoleReviewEditComponent } from './console-review-edit.component';

@NgModule({
  declarations: [ConsoleReviewEditComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
    SharedResultViewModule, SharedScoreItemListModule,
    ConsoleReviewEditRoutingModule
  ],
  exports: [ConsoleReviewEditComponent]
})
export class ConsoleReviewEditModule { }
