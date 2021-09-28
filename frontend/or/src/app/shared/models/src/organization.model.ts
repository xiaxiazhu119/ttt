import { StatusEnum } from "@app/shared/enums/app.enum";
import { BaseModel, BaseSearchModel } from "./base.model";

export class Organization extends BaseModel {
  id?: number;
  name?: string;
  contact?: string;
  tel?: string;
  status: StatusEnum;
  statusName?: string;
  enabled?: boolean;
}

export class OrganizationSearch extends BaseSearchModel {
}
