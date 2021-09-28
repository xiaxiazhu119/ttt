import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatMenuModule } from '@angular/material';

import { XNgLibsBsPaginationModule, XNgLibsDirectiveModule } from 'x-ng-libs';

import { SharedScoreItemListComponent } from './shared-score-item-list.component';

@NgModule({
  declarations: [SharedScoreItemListComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatMenuModule,
    XNgLibsDirectiveModule, XNgLibsBsPaginationModule,
  ],
  exports: [SharedScoreItemListComponent]
})
export class SharedScoreItemListModule { }
