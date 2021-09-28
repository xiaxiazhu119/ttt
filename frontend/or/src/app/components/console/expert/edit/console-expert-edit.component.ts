import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from '@app/app-base.component';
import { User, UserPassport, UserProfile } from '@app/shared/models/app.model';
import { AppConfigService, PassportService } from '@app/shared/services/app-bundle.service';
import { XNgLibsRouteService } from 'x-ng-libs';

@Component({
  selector: 'app-console-expert-edit',
  templateUrl: './console-expert-edit.component.html',
  styleUrls: ['./console-expert-edit.component.scss'],
  providers: [XNgLibsRouteService]
})
export class ConsoleExpertEditComponent extends AppBaseComponent implements OnInit {

  // user: User = new User();
  // profile: UserProfile = new UserProfile();
  // up: UserPassport = new UserPassport();

  // pwdHide: boolean = true;
  // confirmPwdHide: boolean = true;

  // submitted: boolean = false;

  constructor(
    public routeService: XNgLibsRouteService,
    public appConfigService: AppConfigService,
    public passportService: PassportService,
  ) {
    super(routeService, appConfigService, passportService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  submit(): void { }

}
