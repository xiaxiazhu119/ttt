import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ScoreTabItemBaseComponent } from '../score-tab-item-base.component';

@Component({
  selector: 'app-console-score-template',
  templateUrl: './console-score-template.component.html',
  styleUrls: ['./console-score-template.component.scss']
})
export class ConsoleScoreTemplateComponent extends ScoreTabItemBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit()
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
  }

}
