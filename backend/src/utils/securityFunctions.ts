import { UserDbImplementations } from "../implementations/dbImplementation";

import { verifyToken } from "./jwtMethods";


export const searchParamAuthChecker = async (authToken: string) => {
    const userCrudInstance = new UserDbImplementations();
    if(authToken && authToken.startsWith("Bearer ")) {
        let token = authToken.split(" ")[1];
        try {
            let decodedToken = await verifyToken(token);
            
            if(decodedToken !== undefined) {
                const user = await userCrudInstance.getByUserId(decodedToken);
                if(user) {
                    return user;
                }
                else {
                    return "Token Wrong";
                }
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