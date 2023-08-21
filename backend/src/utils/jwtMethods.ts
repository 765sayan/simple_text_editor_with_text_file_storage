// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";

const verifyToken = (token: string) => {
  if(process.env.SECRET_KEY) {
    return jwt.verify(token, process.env.SECRET_KEY);
  }
};

const generateToken = (data: string) => {
  if(process.env.SECRET_KEY) {
    return jwt.sign(data, process.env.SECRET_KEY);
  }
};

module.exports = { verifyToken, generateToken };
