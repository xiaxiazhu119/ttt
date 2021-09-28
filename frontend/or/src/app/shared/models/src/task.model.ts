import { LevyScopeEnum, ReviewModeEnum, StatusEnum, TaskModeEnum } from "@app/shared/enums/app.enum";
import { BaseModel, BaseSearchModel } from "./base.model";
import { ResultTemplate } from "./result.model";
import { ScoreItem } from "./score.model";
import { UserGroup } from "./user.model";

export class Task extends BaseModel {
  id?: number;
  name: string;
  levyDateRange?: Date[];
  levyStartDate?: string | Date;
  levyEndDate?: string | Date;
  reviewDateRange?: Date[];
  reviewStartDate?: string | Date;
  reviewEndDate?: string | Date;
  scope?: LevyScopeEnum;
  scopeName?: string;
  groups?: UserGroup[];
  groupIds?: string | number[];
  groupId?: number;
  groupNames?: string;
  taskMode?: TaskModeEnum;
  taskModeName?: string;
  reviewMode?: ReviewModeEnum;
  reviewModeName?: string;
  status?: StatusEnum;
  statusName?: string;
  description?: string;

  inLevying?: boolean;
  inReviewing?: boolean;
  expired?: boolean;

  userSubmitted?: boolean;

  scoreItems?: ScoreItem[];
  hasResult?: boolean;
  taskStarted?: boolean;
  // scoreItemIds?: string | number[];

  resultTemplate?: ResultTemplate;

}

export class TaskSearch extends BaseSearchModel {
  userId?: number;
  isExpert?: boolean;
}
