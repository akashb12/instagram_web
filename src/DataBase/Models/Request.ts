import { Model } from "objection";
import {User} from './User';
export class Requests extends Model {
  user_id!: number
  request_id!: number
  static get tableName() {
    return "requests";
  }
  static get relationMappings() {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: "requests.request_id",
          to: "user.id",
        },
      },
    };
  }
}