import { Model } from "objection";
import {User} from './User';
export class Comment extends Model {
  post_id!: number
  user_id!: number
  comment!: string
  static get tableName() {
    return "comments";
  }
  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "comments.user_id",
          to: "user.id",
        },
      },
    };
  }
}
