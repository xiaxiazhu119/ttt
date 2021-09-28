import { Component, OnInit } from '@angular/core';

import { XNgLibsEventAnnounceService } from 'x-ng-libs';
import { PassportService } from '@app/shared/services/app-bundle.service';
import {  User } from '@app/shared/models/app.model';

@Component({
  selector: 'app-passport-sign-out',
  template: ``,
  providers: []
})
export class PassportSignOutComponent implements OnInit {

  constructor(
    private eventAnnounceService: XNgLibsEventAnnounceService,
    private passportService: PassportService
  ) {

  }

  ngOnInit(): void {

    this.passportService.signOut('/', () => {
      // this.eventAnnounceService.announceEvent({
      //   user: new User(),
      //   profile: new UserProfile(),
      // });
    });

  }

}
