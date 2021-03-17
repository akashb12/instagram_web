import knex from 'knex';
const knexfile =require('./knexfile');
import {Model} from 'objection';

function setupDb(){
    const db = knex(knexfile.development);
    Model.knex(db);

}
module.exports=setupDb