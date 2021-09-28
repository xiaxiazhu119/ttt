import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-organization-user',
  templateUrl: './organization-user.component.html',
  styleUrls: ['./organization-user.component.scss']
})
export class OrganizationUserComponent implements OnInit {

  @Input()
  tabChange: any;
  @Input()
  id: number;

  userId: number;

  newUserId: number;

  showCreate: boolean = false;
  userDataChanged = false;

  editSlideBtnDelay: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    console.log('org-user-base:', this.id)
    console.log('tab change:', this.tabChange)
    if (this.tabChange && this.tabChange.index === 1) {
      setTimeout(() => {
        this.editSlideBtnDelay = false;
      }, 600);
    } else {
      this.editSlideBtnDelay = true;
    }
  }

  create(): void {
    this.showCreate = true;
  }

  // onCancel(id?: number): void {
  //   this.showCreate = false;
  //   if (id) {
  //     this.refresh = !!id;
  //   }
  // }

  formSubmit(e: number): any {
    this.newUserId = e;
  }

}
