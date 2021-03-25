import { Model } from "objection";
import {User} from './User';
export class Reply extends Model {
  static get tableName() {
    return "replies";
  }
  static get relationMappings() {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: "replies.userId",
          to: "user.id",
        },
      },
    };
  }
}