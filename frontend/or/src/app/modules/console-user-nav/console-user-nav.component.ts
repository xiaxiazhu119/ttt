import { Component, OnInit } from '@angular/core';
import { User } from '@app/shared/models/app.model';
import { PassportService } from '@app/shared/services/app-bundle.service';

@Component({
  selector: 'app-console-user-nav',
  templateUrl: './console-user-nav.component.html',
  styleUrls: ['./console-user-nav.component.scss']
})
export class ConsoleUserNavComponent implements OnInit {

  user: User;

  active: boolean = false;

  constructor(
    private passportService: PassportService
  ) {
    this.user = passportService.getUserCookie();
  }

  ngOnInit() {
  }

  goToProfile(): void { }

  updatePwd(): void { }

  signOut(): void {
    this.passportService.signOut();
  }

  switchMenu(): void {
    this.active = !this.active;
  }

}
