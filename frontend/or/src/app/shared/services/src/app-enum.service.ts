import { Injectable } from '@angular/core';

import { XNgLibsUtilitiesService, KeyValuePair, KeyValuePairActivated } from 'x-ng-libs';
import { FormControlEnum, LevyScopeEnum, ReviewModeEnum, RoleEnum, StatusEnum, TaskModeEnum } from '@app/shared/enums/app.enum';

@Injectable({
  providedIn: 'root'
})
export class AppEnumService {

  constructor(
    private utilitiesService: XNgLibsUtilitiesService
  ) { }

  //#region status

  getStatusName(status: StatusEnum): string {
    switch (status) {
      case StatusEnum.Unread:
        return '未读';
      case StatusEnum.HaveRead:
        return '已读';
        // case StatusEnum.Ignored:
        //   return '已忽略';
        // case StatusEnum.Confirmed:
        //   return '已确认';
        // case StatusEnum.Cancelled:
        //   return '已取消';
        // case StatusEnum.Completed:
        // return '已完成';
        return '已招募';
      case StatusEnum.Draft:
        return '草稿';
      case StatusEnum.Pending:
        return '待审核';
      case StatusEnum.Return:
        return '退回';
      case StatusEnum.Published:
        return '已发布';
      // case StatusEnum.Refused:
      //   return '已拒绝';
      // case StatusEnum.Agreed:
      //   return '已同意';
      // case StatusEnum.Withdraw:
      //   return '已撤回';
      case StatusEnum.Expired:
        return '已过期';
    }
  }

  //#endregion

  //#region role
  getRoleName(role: RoleEnum): string {
    switch (role) {
      case RoleEnum.Normal:
        return '普通用户';
      case RoleEnum.Expert:
        return '专家';
      case RoleEnum.Org:
        return '机构';
      case RoleEnum.Admin:
        return '管理员';
      case RoleEnum.SA:
        return 'SA';
    }
  }
  getRoleList(): KeyValuePair[] {
    return this.utilitiesService.getEnumKvpList(RoleEnum, this.getRoleName);
  }
  //#endregion

  //#region task

  getTaskModeName(mode: TaskModeEnum): string {
    switch (mode) {
      case TaskModeEnum.Full:
        return '全专家打分';
      case TaskModeEnum.Specify:
        return '指定专家打分';
    }
  }

  getTaskModeList(): KeyValuePair[] {
    return this.utilitiesService.getEnumKvpList(TaskModeEnum, this.getTaskModeName);
  }

  getLevyScopeName(scope: LevyScopeEnum): string {
    switch (scope) {
      case LevyScopeEnum.Open:
        return '开放式征集';
      case LevyScopeEnum.Inner:
        return '平台内机构';
      case LevyScopeEnum.Specify:
        return '指定机构';
    }
  }

  getLevyScopeList(): KeyValuePair[] {
    return this.utilitiesService.getEnumKvpList(LevyScopeEnum, this.getLevyScopeName);
  }

  getReviewModeName(mode: ReviewModeEnum): string {
    switch (mode) {
      case ReviewModeEnum.Open:
        return '开放审';
      case ReviewModeEnum.Blind:
        return '盲审';
    }
  }

  getReviewModeList(): KeyValuePair[] {
    return this.utilitiesService.getEnumKvpList(ReviewModeEnum, this.getReviewModeName);
  }

  //#endregion

  //#region form control
  getFormControlName(ctrl: FormControlEnum): string {
    switch (ctrl) {
      case FormControlEnum.Input:
        return '单行文本框';
      case FormControlEnum.TextArea:
        return '多行文本框';
      case FormControlEnum.Image:
        return '图片上传控件';
      case FormControlEnum.Attachment:
        return '附件上传控件';
      case FormControlEnum.Url:
        return '外链地址';
    }
  }

  getFormControlList(): KeyValuePair[] {
    return this.utilitiesService.getEnumKvpList(FormControlEnum, this.getFormControlName);
  }
  //#endregion

}
