import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { XNgLibsDialogService, XNgLibsMatSnackBarService } from 'x-ng-libs';
import { PassportService, UserService } from '@app/shared/services/app-bundle.service';
import { User } from '@app/shared/models/app.model';
import { SharedBaseBtnComponent } from '../../../../shared-base-btn.component';

export class SharedUserEditBtnBaseComponent extends SharedBaseBtnComponent implements OnInit {

  @Input()
  orgId: number;

  constructor(
  ) {
    super();
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

  onSubmit(e: any): void {
    this.formSubmitted.emit(e);
  }

}
