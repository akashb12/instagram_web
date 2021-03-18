import { Model } from "objection";

class Comment extends Model {
  static get tableName() {
    return "comments";
  }
  static get relationMappings() {
    const User = require("./User");
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: "comments.userId",
          to: "user.id",
        },
      },
    };
  }
}
module.exports = Comment;
