import { Model } from "objection";
import { User } from "./User";
export class Follower extends Model {
  user_id!: number;
  follower_id!: number;
  static get tableName() {
    return "followers";
  }
  static get relationMappings() {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: "followers.follower_id",
          to: "user.id",
        },
      },
    };
  }
}
