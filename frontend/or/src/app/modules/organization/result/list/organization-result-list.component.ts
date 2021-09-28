import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { AppCommonService } from '@app/shared/services/app-bundle.service';

@Component({
  selector: 'app-organization-result-list',
  templateUrl: './organization-result-list.component.html',
  styleUrls: ['./organization-result-list.component.scss']
})
export class OrganizationResultListComponent implements OnInit {

  @Input()
  id: number;

  constructor(
    private appCommonService: AppCommonService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    console.log('org-rst-list', this.id)
  }

  ngOnInit() {
    // this.size = this.appCommonService.getWindowSize();
  }

}
