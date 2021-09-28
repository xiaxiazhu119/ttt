import { RoleEnum, StatusEnum } from "@app/shared/enums/app.enum";
import { KeyValuePair } from "x-ng-libs";
import { BaseModel, BaseSearchModel } from "./base.model";

export class User extends BaseModel {
  id: number;
  role?: RoleEnum;
  roleExt?: RoleEnum;
  userName?: string;
  status: StatusEnum;
  orgId?: number;
  orgName?: string;
  _?: string;

  name?: string;
}

export class UserPassport extends User {
  pwd?: string;
  confirmPwd?: string;
  pwdEncrypted?: string;
  captcha?: string;
  captchaChars?: string;
}

export class UserSearch extends BaseSearchModel {
  role?: RoleEnum;
  orgId?: number;
}

export class UserProfile extends BaseModel {
  userId?: number;
  name?: string;
  mobile?: string;
  position?: string;
  job?: string;
  title?: string;
  remark?: string;
  orgId?: number;
  orgName?: string;

  fields?: KeyValuePair[];
  finances?: UserFinance[];

  fieldIdList?: number[];
}

export class UserView extends BaseModel {
  id: number;
  role?: RoleEnum;
  roleExt?: RoleEnum;
  userName?: string;
  status: StatusEnum;
  name?: string;
  mobile?: string;
  position?: string;
  job?: string;
  title?: string;
  remark?: string;
  orgId?: number;
  orgName?: string;

  active?: boolean;
  enabled?: boolean;
}

export class UserFinance extends BaseModel {
  id?: number;
  userId: number;
  type?: number;
  status?: StatusEnum;
  account: string
  accountExt: string;
}

export class UserGroup extends BaseModel {
  id?: number;
  name?: string;
  status: StatusEnum;
  leader?: string | KeyValuePair;
  leaderName?: string;
  cnt?: number;

  selected?: boolean;
}

export class UserGroupSearch extends BaseSearchModel {

}

export class UserGroupRelation extends BaseModel {
  groupId: number;
  userId: number;
  isLeader: boolean;
  name: string;
  groupName: string;
  mobile?: string;
  selected?: boolean;
}
