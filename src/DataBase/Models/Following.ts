import { Model } from "objection";
import {User} from './User';
export class Following extends Model {
  id!: number;
  user_id!: number;
  following_id!: number;
  static get tableName() {
    return "following";
  }
  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "following.following_id",
          to: "user.id",
        },
      },
    };
  }
}