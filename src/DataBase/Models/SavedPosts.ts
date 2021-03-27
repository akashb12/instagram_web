import { Model } from "objection";
import { Post } from "./Post";
export class SavedPosts extends Model {
  id!: number;
  post_id!: number;
  user_id!: number;
  static get tableName() {
    return "saved_posts";
  }
  static get relationMappings() {
    return {
      posts: {
        relation: Model.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: "saved_posts.postId",
          to: "posts.id",
        },
      },
    };
  }
}
