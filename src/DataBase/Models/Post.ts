import {Model} from 'objection';

class Post extends Model{
    static get tableName(){
        return 'posts';
    }
}
module.exports=Post