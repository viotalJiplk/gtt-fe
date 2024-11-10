import { isExpired, decodeToken } from "react-jwt";
import { addAuthorization } from '../axios/axios';

interface LoadJwtReturn {
    userObject: Object,
    discordId: string,
}

export function loadJwt(): LoadJwtReturn {
    let jwtString = localStorage.getItem("jwt") || "";
    let userObject = localStorage.getItem("userObject") || "";
    let isTokenExpired = isExpired(jwtString);
    if(isTokenExpired){
        localStorage.removeItem("jwt");
        localStorage.removeItem("userObject");
        return {
            "discordId": "notLoggedIn",
            "userObject": {}
        }
    } else {
        addAuthorization("Bearer " + jwtString);
        let decodedToken = decodeToken(jwtString) as any;
        return {
            "discordId": decodedToken[decodedToken["iss"]+"/discord/userid"],
            "userObject": JSON.parse(userObject)
        }
    }
}