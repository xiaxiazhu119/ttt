import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ScoreItem } from '@app/shared/models/app.model';
import { ScoreTabItemBaseComponent } from '../../score-tab-item-base.component';

@Component({
  selector: 'app-console-score-item-list',
  templateUrl: './console-score-item-list.component.html',
  styleUrls: ['./console-score-item-list.component.scss']
})
export class ConsoleScoreItemListComponent extends ScoreTabItemBaseComponent implements OnInit {

  @ViewChild("editDialogBtn", { static: true })
  editDialogBtn: any
  @ViewChild("editSlideBtn", { static: true })
  editSlideBtn: any

  newId: number;

  newItem: ScoreItem = new ScoreItem();

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit()
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
  }

  formSubmit(e: number): any {
    this.newId = e;
  }

  onEdit(e: any): void {
    console.log(this.windowSize)
    if (this.ws >= this.responsiveBreakpoint.md) {
      this.editDialogBtn.item = e;
      this.editDialogBtn.showEditFormDialog();
    } else {
      this.editSlideBtn.item = e;
      this.editSlideBtn.switchForm();
    }
    // this.editDialogBtn.item = e;
    // this.editDialogBtn.showEditFormDialog();
    // console.log(this.editDialogBtn)
    // console.log(this.editSlideBtn)
  }

}


