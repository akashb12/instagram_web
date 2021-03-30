import { Model } from "objection";
import { User } from "./User";
export class Reply extends Model {
  post_id!: number;
  user_id!: number;
  comment_id!: number;
  reply!: string;
  static get tableName() {
    return "replies";
  }
  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "replies.user_id",
          to: "user.id",
        },
      },
    };
  }
}
