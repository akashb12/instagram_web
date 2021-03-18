import { Model } from "objection";

class Reply extends Model {
  static get tableName() {
    return "replies";
  }
  static get relationMappings() {
    const User = require("./User");
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
module.exports = Reply;
