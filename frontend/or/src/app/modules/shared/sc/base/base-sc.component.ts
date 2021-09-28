import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScBaseComponent } from '../sc-base.component';

@Component({
  selector: 'app-base-sc',
  templateUrl: './base-sc.component.html',
  styleUrls: ['./base-sc.component.scss']
})
export class BaseScComponent extends ScBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
