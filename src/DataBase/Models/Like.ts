import { Model } from "objection";
import {User} from "./User";

export class Like extends Model {
  id!:number
  post_id!:number
  user_id!:number
  static get tableName() {
    return "likes";
  }
  static get relationMappings() {

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "likes.user_id",
          to: "user.id",
        },
      },
    };
  }
}