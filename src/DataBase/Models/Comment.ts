import { Model } from "objection";
import {User} from './User';
export class Comment extends Model {
  static get tableName() {
    return "comments";
  }
  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "comments.userId",
          to: "user.id",
        },
      },
    };
  }
}
