import { Component, OnInit, Input, SimpleChanges, } from '@angular/core';
import { BaseComponent } from '@app/base.component';

export class ScoreTabItemBaseComponent extends BaseComponent implements OnInit {

  @Input()
  tabChange: any;

  editSlideBtnDelay: boolean = true;

  constructor() {
    super();
  }

  ngOnInit() {
    this.delayEditSlideBtn();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.editSlideBtnDelay = true;

    console.log('tab change:', this.tabChange)
    if (this.tabChange) {
      this.delayEditSlideBtn();
    }
  }

  private delayEditSlideBtn() {
    setTimeout(() => {
      this.editSlideBtnDelay = false;
    }, 600);
  }

}
