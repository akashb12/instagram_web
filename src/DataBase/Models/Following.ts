import { Model } from "objection";

class Following extends Model {
  static get tableName() {
    return "following";
  }
  static get relationMappings() {
    const User = require("./User");
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: "following.following_id",
          to: "user.id",
        },
      },
    };
  }
}
module.exports = Following;
