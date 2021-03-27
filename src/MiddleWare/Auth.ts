import { Request, Response, NextFunction } from "express";
import { User } from "../DataBase/Models/User";
import jwt from "jsonwebtoken";
import { config } from "../Config/key";

interface Token {
  id: number;
  iat: number;
  exp: number;
}
async function auth(req: any, res: any, next: any) {
  console.log("token", req.headers);
  const token = req.headers.authorization.split(" ")[1];

  try {
    const verifyToken = jwt.verify(token, config.JWT_SECRET) as Token;
    const users = await User.query().findOne({ id: verifyToken.id });
    if (users) {
      req.token = token;
      req.user = users;
      next();
    } else {
      return res.json({
        status: false,
        message: "user invalid",
      });
    }
  } catch (error) {
    return res.json({
      status: false,
      error: error,
    });
  }
}

export default auth;
