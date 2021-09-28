import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { StatusEnum } from '@app/shared/enums/app.enum';
import { Organization } from '@app/shared/models/app.model';
import { AppCommonService, OrganizationService } from '@app/shared/services/app-bundle.service';
import { XNgLibsMatSnackBarService } from 'x-ng-libs'; import { BaseComponent } from '@app/base.component';

@Component({
  selector: 'app-organization-edit',
  templateUrl: './organization-edit.component.html',
  styleUrls: ['./organization-edit.component.scss']
})
export class OrganizationEditComponent extends BaseComponent implements OnInit {

  @Input()
  id: number;
  @Output()
  orgUpdated = new EventEmitter<any>();

  org: Organization = new Organization();

  private bak: Organization = new Organization();

  constructor(
    private snackbarService: XNgLibsMatSnackBarService,
    private appCommonService: AppCommonService,
    private organizationService: OrganizationService
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    // this.getInfo();
    this.getInfo();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }

  submit(): void {
    this.submitted = true;
    this.org.status = !!this.org.id ? this.org.status : StatusEnum.Normal;

    const prefix = !!this.id ? '编辑' : '新建';

    this.organizationService.createAndUpdate(this.org, (code: number = 0) => {
      this.appCommonService.openSnackBar(code, prefix, () => {
        if (!this.id) {
          this.org.id = code;
        }
        this.orgUpdated.emit(this.org);
        this.submitted = false;
        if (this.org.id) {
          this.getInfo();
        } else {
          this.cancel();
        }
      });
    });
  }

  cancel(): void {
    this.org = Object.assign(this.bak);
  }

  getInfo(): void {
    // console.log('this.id:', this.id)
    if (this.id) {
      this.organizationService.read(this.id, (org: Organization) => {
        this.org = org;
        this.bak = Object.assign(org);
        // console.log(this.org)
      });
    }
  }

}
