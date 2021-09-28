import { Component, EventEmitter, OnInit, Input, Output, ViewChild, SimpleChanges } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { BaseComponent } from '@app/base.component';
import { RoleEnum } from '@app/shared/enums/app.enum';
import { UserSearch, UserView } from '@app/shared/models/app.model';
import { AppCommonService, AppConfigService, UserService } from '@app/shared/services/app-bundle.service';
import { XNgLibsDialogService, XNgLibsPaginationConfig } from 'x-ng-libs';

export class SharedBaseListComponent extends BaseComponent implements OnInit {

  @Input()
  hasSC: boolean = true;
  @Input()
  hasOperation: boolean = true;
  @Input()
  hasCheckbox: boolean = false;
  @Input()
  hasRadio: boolean = false;
  @Input()
  hasFieldColumnLink: boolean = true;
  @Input()
  selectedItems: any[];
  @Input()
  standalone: boolean;
  @Input()
  hasCreate: boolean;
  @Output()
  createClicked = new EventEmitter<any>();
  @Output()
  editClicked = new EventEmitter<any>();
  @Output()
  viewClicked = new EventEmitter<any>();
  // @Output()
  // deleteConfirmed = new EventEmitter<any>();
  @Output()
  dataLoaded = new EventEmitter<any>();
  @Output()
  checkboxItemChecked = new EventEmitter<any>();
  @Output()
  radioItemChanged = new EventEmitter<any>();
  @Output()
  dataChanged = new EventEmitter<any>();

  isAdmin: boolean = false;
  isSA: boolean = false;

  constructor(
    public appCommonService: AppCommonService,
  ) {
    super();
    this.isAdmin = this.appCommonService.isAdmin();
    this.isSA = this.appCommonService.isSA();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedItems && this.selectedItems.length > 0) {
      const t = setInterval(() => {
        // console.log(this.selectedItems, this.list)
        if (this.list && this.list.length > 0) {
          // console.log(this.selectedItems, this.list)
          clearInterval(t);
          this.selectedItems.map(si => {
            // console.log(si)
            const ds = this.list.filter(d => d.id === si.id);
            // console.log(ds)
            if (ds.length > 0) {
              ds[0].selected = true;
            }
          });
        }

      }, 500);
    }
  }

  goToCreate(): void {
    this.createClicked.emit();
  }

  goToEdit(data: number | any): void {
    this.editClicked.emit(data);
  }

  goToView(data: number | any): void {
    // console.log('go to view id:', id)
    this.viewClicked.emit(data);
  }



  delete(data: any | number): void {
    // this.dialogService.openConfirmDialog('确定要删除该项吗？', (dialogRef: any) => {
    //   this.deleteConfirmed.emit({
    //     id,
    //     callback: (code: number) => {
    //       this.appCommonService.openSnackBar(code, '删除', () => {
    //         dialogRef.close();
    //         this.getList();
    //       });
    //     }
    //   })
    // });

  }

  onDelete(msg: string, func: any): void {
    this.appCommonService.openConfirmDialogAndSnackBar(msg, (snackbarCallback: any) => {
      func((code: number) => {
        snackbarCallback(code);
      });
      // this.userGroupService.removeFromRelation(item.groupId, item.userId, (code: number = 0) => {
      //   if (code > 0) {
      //     this.dataChanged.emit();
      //   }
      //   snackbarCallback(code);
      // });
    }, '删除');

  }

  getList(): void {

  }

  onRadioChange(e: any, item: any): void {
    console.log(e, item)
    item.selected = e.source.checked;
    const selectedList = this.list.filter(g => g.selected);
    this.radioItemChanged.emit(selectedList);
  }

  onItemCheck(e: any, item: any): void {
    // console.log(e, item);
    const selectedList = this.list.filter(data => data.selected);
    this.checkboxItemChecked.emit(selectedList);
  }

  getListComplete(list: any, total?: number): void {
    this.list = list;
    this.dataLoaded.emit(this.list)
    if (typeof total !== 'undefined') {
      this.pgCfg.totalItems = total;
    }
    this.dataLoading = false;
  }

}
