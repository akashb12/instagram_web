import {Model} from 'objection';

class Post extends Model{
    static get tableName(){
        return 'posts';
    }
    static get relationMappings() {
        const User = require("./User");
        return {
          user: {
            relation: Model.HasOneRelation,
            modelClass: User,
            join: {
              from: "posts.userId",
              to: "user.id",
            },
          },
        };
      }
}
module.exports=Post