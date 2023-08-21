// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";

export const verifyToken = (token: string) => {
  if(process.env.SECRET_KEY) {
    return jwt.verify(token, process.env.SECRET_KEY);
  }
};

export const generateToken = (data: string) => {
  if(process.env.SECRET_KEY) {
    return jwt.sign(data, process.env.SECRET_KEY);
  }
};
