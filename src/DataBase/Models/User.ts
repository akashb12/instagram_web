import {Model} from 'objection';
import {Post} from './Post';
import {Follower} from './Follower';
import {Following} from './Following'

interface Posts{
  id:number,
  attachment_url:string
}
export class User extends Model{
  id!:number
  full_name!: string
  email!: string
  password!: string
  dob!: Date
  username!: string
  is_private!: boolean
  profile_image!:string
  bio!:string
  postCount!:number
  followerCount!:number
  followingCount!:number
  posts!:any

    static get tableName(){
        return 'user';
    }
    static get relationMappings() {
        return {
          posts: {
            relation: Model.BelongsToOneRelation,
            modelClass: Post,
            join: {
              from: "posts.user_id",
              to: "user.id",
            },
          },
          followers: {
            relation: Model.HasManyRelation,
            modelClass: Follower,
            join: {
              from: "followers.follower_id",
              to: "user.id",
            },
          },
          following: {
            relation: Model.HasManyRelation,
            modelClass: Following,
            join: {
              from: "following.following_id",
              to: "user.id",
            },
          },
        };
      }
}
