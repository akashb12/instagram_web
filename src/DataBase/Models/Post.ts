import { Model } from "objection";
import {User} from './User';
import {Comment} from './Comment';
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
          from: "posts.userId",
          to: "user.id",
        },
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "comments.postId",
          to: "posts.id",
        },
      },
    };
  }
}