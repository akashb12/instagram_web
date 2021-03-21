import { Model } from "objection";

class Like extends Model {
  static get tableName() {
    return "likes";
  }
  static get relationMappings() {
    const User = require("./User");
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
module.exports = Like;