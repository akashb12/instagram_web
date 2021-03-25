import { Model } from "objection";

class Post extends Model {
  static get tableName() {
    return "posts";
  }
  static get relationMappings() {
    const User = require("./User");
    const Comments = require("./Comment");
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: "posts.userId",
          to: "user.id",
        },
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comments,
        join: {
          from: "comments.postId",
          to: "posts.id",
        },
      },
    };
  }
}
module.exports = Post;
