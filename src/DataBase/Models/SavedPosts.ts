import { Model } from "objection";

class SavedPosts extends Model {
  static get tableName() {
    return "saved_posts";
  }
  static get relationMappings() {
    const Post = require("./Post");
    return {
      posts: {
        relation: Model.HasOneRelation,
        modelClass: Post,
        join: {
          from: "saved_posts.postId",
          to: "posts.id",
        },
      },
    };
  }
}
module.exports = SavedPosts;
