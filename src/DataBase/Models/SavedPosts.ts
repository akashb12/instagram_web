import { Model } from "objection";
import { Post } from "./Post";
export class SavedPosts extends Model {
  postId!: number;
  userId!: number;
  static get tableName() {
    return "saved_posts";
  }
  static get relationMappings() {
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
