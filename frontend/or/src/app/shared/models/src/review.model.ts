import { BaseModel, BaseSearchModel } from "./base.model";
import { ScoreItem } from "./score.model";

export class Review extends BaseModel {
  id?: number;
  userId: number;
  resultId: number;
  scores?: string | any;
  totalScore?: number;
  opinion?: string;
  scoreItems: ScoreItem[];
  createTime?: Date;
}

export class ReviewSearch extends BaseSearchModel {
  resultId?: number;
  taskId?: number;
  userId?: number;
}

export class ReviewView extends Review {
  userName?: string;
  name?: string;
  orgName?: string;
}
