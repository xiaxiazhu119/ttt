import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { AppAjaxService, AppCommonService, AppConfigService } from '@app/shared/services/app-bundle.service';
import { XNgLibsFileUploadConfig, XNgLibsMatSnackBarService } from 'x-ng-libs';

@Component({
  selector: 'app-shared-file-upload',
  template: `
  <x-ng-libs-file-upload [config]="fileUploadConfig" (fileUploaded)="onFileUploaded($event)"></x-ng-libs-file-upload>
  &nbsp;&nbsp;<span *ngIf="showHint" class="hint">{{hint}}{{extraHint}}</span>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class SharedFileUploadComponent implements OnInit {

  @Input()
  dictType: string;
  @Input()
  acceptMimeType: string;
  @Input()
  pathPrefix: string;
  @Input()
  showHint: boolean = true;
  @Input()
  extraHint: string;
  @Input()
  uploadConfig: XNgLibsFileUploadConfig;

  @Output()
  fileUploaded = new EventEmitter<any>();


  fileUploadConfig: XNgLibsFileUploadConfig = {
    url: '',
    // acceptMimeType: MimeType.images,
    formData: [],
  };

  fileName: string;
  filePath: string;
  apiHost: string;

  hint: string;

  constructor(
    private snackBarService: XNgLibsMatSnackBarService,
    public appCommonService: AppCommonService,
    private appConfigService: AppConfigService,
    private ajaxService: AppAjaxService,
  ) { }

  ngOnInit() {
    this.initConfig();
  }

  ngOnChanges() {
    this.initConfig();
  }

  onFileUploaded(e: any): void {
    console.log('on file uploaded:', e)
    if (e) {
      if (Number(e.code) > 0) {
        const filePath = e.data.file_path;
        const ps = filePath.split('/');
        const dummyPaths = ps.reduce((previous, item, index) => (index > 1 && previous.push(item), previous), []);
        dummyPaths.unshift(this.pathPrefix);
        const dummyPath = dummyPaths.join('/');
        // const filePath = e.data.file_path;
        // const _ = filePath.split('/');
        // const fileName = _[_.length - 1];
        // const path = this.pathPrefix + '/' + filePath;
        // // const fullPath = 'http://10.0.11.198:8081' + path;
        const host = this.apiHost.lastIndexOf('/') === this.apiHost.length - 1 ? this.apiHost.substring(0, this.apiHost.length - 1) : this.apiHost;
        const fullPath = host + dummyPath;

        this.fileUploaded.emit({
          fileName: ps[ps.length - 1],
          path: dummyPath,
          fullPath
        });

        // this.addition.attachment = path;
        // relative_path
        // this.profile.avatar = this.appCommonService.getApiHost() + this.profile.avatar;
        // console.log(this.profile)
      } else {
        this.snackBarService.open('上传失败，请确认所传文件是否符合要求。');
      }
    }
  }

  private initConfig() {

    if (this.uploadConfig) {
      Object.assign(this.fileUploadConfig, this.uploadConfig);
    }

    // const customHeadersConf = this.appConfig.apis.customHeaders;
    // const userCookie = passportService.getUserCookie();
    // const tokenId = userCookie ? (userCookie.tokenId || '') : '';


    // this.fileUploadConfig.formData = cryptoJsService.encryptByAES({
    //   tokenId
    // });

    const header = this.ajaxService.getAuthHeader();
    this.fileUploadConfig.customHeaders = [{
      'name': header.key,
      'value': header.value
    }];

    this.fileUploadConfig.url = this.appCommonService.getFileUploadApi();
    this.apiHost = this.appCommonService.getApiHost();

    if (this.acceptMimeType) {
      this.fileUploadConfig.acceptMimeType = this.acceptMimeType;
    }

    // const header = this.ajaxService.getAuthHeader();
    // // console.log(JSON.stringify(header))
    // // const v = JSON.parse("{\"" + header.key + "\":\"" + header.value + "\"}");
    // this.fileUploadConfig.customHeaders = [header];
    // console.log(this.fileUploadConfig)

    // console.log(this.pathPrefix)

    this.pathPrefix = this.pathPrefix || '/attachment';

    const config = this.appConfigService.getConfig();
    const maxSize = config.validation.upload.common.maxSize;
    this.fileUploadConfig.maxFileSize = maxSize;
    this.hint = '*附件大小为' + maxSize / 1024 / 1024 + 'M以内。';

  }

}
