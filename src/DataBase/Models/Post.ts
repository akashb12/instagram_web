import { Model } from "objection";
import {User} from './User';
import {Comment} from './Comment';
import {Like} from './Like';
import { SavedPosts } from "./SavedPosts";
import { Reply } from "./Reply";
export class Post extends Model {
  id!:number
  caption!: string
  attachment_url!: string
  tagged_users!: number[]
  comments_enabled!: boolean
  archive!: boolean
  user_id!: number
  static get tableName() {
    return "posts";
  }
  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "posts.user_id",
          to: "user.id",
        },
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "comments.post_id",
          to: "posts.id",
        },
      },
      likes: {
        relation: Model.HasManyRelation,
        modelClass: Like,
        join: {
          from: "likes.post_id",
          to: "posts.id",
        },
      },
      saved_posts: {
        relation: Model.HasManyRelation,
        modelClass: SavedPosts,
        join: {
          from: "saved_posts.post_id",
          to: "posts.id",
        },
      },
      replies: {
        relation: Model.HasManyRelation,
        modelClass: Reply,
        join: {
          from: "replies.post_id",
          to: "posts.id",
        },
      },
    };
  }
}