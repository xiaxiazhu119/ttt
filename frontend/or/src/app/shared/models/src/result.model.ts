import { FormControlEnum } from "@app/shared/enums/app.enum";
import { BaseModel, BaseSearchModel } from "./base.model";

export class Result extends BaseModel {
  id?: number;
  taskId: number;
  userId: number;
  contents: string | ResultTemplateFormControl[];
}

export class ResultView extends BaseModel {
  resultId: number;
  taskId: number;
  userId: number;
  contents: any;
  createTime: Date;
  name: string;
  mobile?: string;
  taskName: string;

  reviewId?: number;

}

export class ResultSearch extends BaseSearchModel {
  taskId?: number;
  userId?: number;
  isExpert?: boolean;
}

export class ResultTemplate extends BaseModel {
  id?: number;
  name: string;

  controls: ResultTemplateFormControl[] | string;

  selected?: boolean;
}

export class ResultTemplateSearch extends BaseSearchModel {
}

export class ResultTemplateFormControl extends BaseModel {
  id?: number;
  name: string;
  placeholder?: string;
  type: FormControlEnum;
  index?: number;
  required: boolean;

  value?: any;
}
