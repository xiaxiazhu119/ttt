import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export class ScBaseComponent implements OnInit {

  @Input()
  hasCreate: boolean;
  @Input()
  keywordPlaceholder: string;
  @Input()
  sc: any;
  @Output()
  searchClicked = new EventEmitter<any>();
  @Output()
  createClicked = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  search(): void {
    this.searchClicked.emit();
  }

  goToCreate(): void {
    this.createClicked.emit();
  }

  clear(): void {
    if (this.sc && this.sc.keyword) {
      this.sc.keyword = '';
    }
  }

}
