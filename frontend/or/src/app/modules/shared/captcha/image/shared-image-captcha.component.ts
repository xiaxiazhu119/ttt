import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppCommonService } from '@app/shared/services/app-bundle.service';

@Component({
  selector: 'app-shared-image-captcha',
  template: `
  <mat-form-field>
    <mat-label><span *ngIf="showRequired" class="required strong">*</span>验证码</mat-label>
    <input matInput type="text" [formControl]="captchaIpt" placeholder="请输入验证码" maxlength="20" >
    <a matSuffix href="javascript:;" class="captcha-img-link" (click)="getImageCaptcha()" *ngIf="img"><img [src]="img" alt=""></a>
  </mat-form-field>
  `,
  styleUrls: ['./shared-image-captcha.component.scss']
})
export class SharedImageCaptchaComponent implements OnInit {

  @Input()
  ts: number;
  @Input()
  showRequired: boolean;

  @Output()
  captchaValueChanged = new EventEmitter<any>();
  @Output()
  captchaLoaded = new EventEmitter<any>();

  captchaIpt = new FormControl();

  img: string;
  chars: string;

  constructor(
    private appCommonService: AppCommonService
  ) {
  }

  ngOnInit() {
    this.getImageCaptcha();
    this.captchaIpt.valueChanges.subscribe(v => {
      this.captchaValueChanged.emit(v);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.getImageCaptcha();

  }

  getImageCaptcha(): void {
    this.appCommonService.getImageCaptcha((img: string, chars: string) => {
      // console.log(img, chars)
      this.img = img;
      this.chars = chars;
      this.captchaLoaded.emit({
        img,
        chars
      });
    });
  }

}
