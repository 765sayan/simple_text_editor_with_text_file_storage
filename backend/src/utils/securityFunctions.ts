import { UserDbImplementations } from "../implementations/dbImplementation";

const { verifyToken } = require("../utils/jwtMethods.js");


export const searchParamAuthChecker = async (authToken: string) => {
    const userCrudInstance = new UserDbImplementations();
    if(authToken && authToken.startsWith("Bearer ")) {
        let token = authToken.split(" ")[1];
        try {
            let decodedToken = await verifyToken(token, process.env.SECRET_KEY);
            
            const user = await userCrudInstance.getByUserId(decodedToken);
            if(user) {
                return user;
            }
            else {
                return "Token Wrong";
            }
        } catch(err) {
            console.log(err);
            return "Token Wrong";
        }
    }
    else {
        return "Token Wrong";
    }
}