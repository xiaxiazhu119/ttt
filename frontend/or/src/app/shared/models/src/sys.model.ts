import { SysDictTypeEnum } from "@app/shared/enums/app.enum";
import { BaseModel, BaseSearchModel } from "./base.model";

export class Sys extends BaseModel {
  id?: number;
  type: SysDictTypeEnum;
  name: string;
  checked?: boolean;
}

export class SysSearch extends BaseSearchModel {
  type?: SysDictTypeEnum;
}