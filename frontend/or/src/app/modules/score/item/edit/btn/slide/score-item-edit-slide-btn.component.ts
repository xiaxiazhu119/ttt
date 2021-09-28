import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ScoreItemEditBtnBaseComponent } from '../score-item-edit-btn-base.component';

@Component({
  selector: 'app-score-item-edit-slide-btn',
  template: `
  <div id="score-item-edit-form-container" [ngClass]="{'active': active}">
    <app-score-item-edit-form [item]="item" (formSubmitted)="onSubmit($event)" (cancelled)="onCancel()"></app-score-item-edit-form>
  </div>
  
  <button mat-mini-fab color="primary" type="button" class="create-btn sm" (click)="switchForm()">
    <i class="material-icons">add</i>
  </button>
  `,
  styleUrls: ['./score-item-edit-slide-btn.component.scss']
})
export class ScoreItemEditSlideBtnComponent extends ScoreItemEditBtnBaseComponent implements OnInit {

  active: boolean = false;

  constructor(
  ) {

    super();

  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.item)
  }

  switchForm(): void {
    this.active = !this.active;
  }

  onSubmit(e: any): void {
    this.onCancel()
    super.onSubmit(e);
  }

  onCancel(): void {
    this.item = undefined;
    this.active = false;
  }

}
