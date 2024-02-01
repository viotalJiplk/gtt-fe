import { useContext, useEffect } from "react";
import { Context } from "../../../store/context";
import { ProfileIcon } from "../Assets/Assets";
import { useHistory } from "react-router-dom";
import classes from "./Login.module.scss";



const Login = () =>{
    const history = useHistory();
    const context = useContext(Context);

    async function loginFunction(){
        history.push("/account");
    }
    

    return <div onClick={loginFunction}>
        {(context.state.discordId !== "notLoggedIn" && context.state.discordId !== ""  && context.state.avatar !== "" && 
            <img className={classes.Login__Avatar} src={"https://cdn.discordapp.com/avatars/" + context.state.discordId + "/" + context.state.avatar +".png"}></img> )
            || <ProfileIcon></ProfileIcon>}
        </div>
}

export default Login