import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { XNgLibsDialogService, XNgLibsMatSnackBarService } from 'x-ng-libs';
import { PassportService, UserService } from '@app/shared/services/app-bundle.service';
import { ScoreItem, User } from '@app/shared/models/app.model';

export class SharedBaseBtnComponent implements OnInit {

  @Input()
  btnTxt: string;
  @Input()
  useBtn: boolean = true;
  @Output()
  formSubmitted = new EventEmitter<any>();

  active: boolean = false;

  constructor(
  ) {
  }

  ngOnInit() {
    // const btnStyle = this.useBtn ? 'mat-raised-button' : 'mat-button';
    // this.renderer.setAttribute(this.editBtn._elementRef.nativeElement, btnStyle, '');
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }

  switchForm(): void {
    this.active = !this.active;
  }

  onSubmit(e: any): void {
    this.formSubmitted.emit(e);
  }

  onCancel(): void {
    this.active = false;
  }

}
