import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCheckboxModule, MatRadioModule } from '@angular/material';

import { GroupExcludeUserListComponent } from './group-exclude-user-list.component';

@NgModule({
  declarations: [GroupExcludeUserListComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCheckboxModule, MatRadioModule,
  ],
  exports: [GroupExcludeUserListComponent]
})
export class GroupExcludeUserListModule { }
