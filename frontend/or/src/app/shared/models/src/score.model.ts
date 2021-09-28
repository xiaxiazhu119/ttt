import { BaseModel, BaseSearchModel } from "./base.model";

export class ScoreItem extends BaseModel {
  id?: number;
  name: string;
  remark?: string
  valueRange: string | number[] | any;
  minValue: number;
  maxValue: number;

  selected?: boolean;
  value?: number;
}

export class ScoreItemSearch extends BaseSearchModel {
  taskId?: number;
}