import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';

import { SharedResultViewModule, SharedScoreItemListModule } from '@app/modules/public-api';

import { ConsoleReviewViewRoutingModule } from './console-review-view-routing.module';
import { ConsoleReviewViewComponent } from './console-review-view.component';


@NgModule({
  declarations: [ConsoleReviewViewComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
    SharedResultViewModule, SharedScoreItemListModule,
    ConsoleReviewViewRoutingModule
  ],
  exports: [ConsoleReviewViewComponent]
})
export class ConsoleReviewViewModule { }
