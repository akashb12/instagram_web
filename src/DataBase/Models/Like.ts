import { Model } from "objection";
import {User} from "./User";

export class Like extends Model {
  static get tableName() {
    return "likes";
  }
  static get relationMappings() {

    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: "likes.userId",
          to: "user.id",
        },
      },
    };
  }
}