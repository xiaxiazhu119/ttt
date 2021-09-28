import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatSlideToggleModule } from '@angular/material';

import { SharedUserViewModule } from '@app/modules/public-api';

import { ConsoleExpertViewRoutingModule } from './console-expert-view-routing.module';
import { ConsoleExpertViewComponent } from './console-expert-view.component';

@NgModule({
  declarations: [ConsoleExpertViewComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatSlideToggleModule,
    SharedUserViewModule,
    ConsoleExpertViewRoutingModule
  ],
  exports: [ConsoleExpertViewComponent]
})
export class ConsoleExpertViewModule { }
