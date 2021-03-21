import { Model } from "objection";

class Request extends Model {
  static get tableName() {
    return "requests";
  }
  static get relationMappings() {
    const User = require("./User");
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: "requests.request_id",
          to: "user.id",
        },
      },
    };
  }
}
module.exports = Request;
