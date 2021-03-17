import {  Request, Response } from 'express';
const User = require('../DataBase/Models/User');
module.exports.register = async function (req:Request, res:Response) {
    console.log(req.body)
 };