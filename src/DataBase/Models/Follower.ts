import { Model } from "objection";

class Follower extends Model {
  static get tableName() {
    return "followers";
  }
  static get relationMappings() {
    const User = require("./User");
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
module.exports = Follower;
