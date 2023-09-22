import { ProfileIcon } from "../Assets/Assets";

async function loginFunction(){
    const rediectUrl = await fetch("/backend/discord/auth").then(async function(result){return (await result.json()).redirect_url});
    window.location.href = rediectUrl;
}

const Login = () =>{
    return <div onClick={loginFunction}><ProfileIcon></ProfileIcon></div>
}

export default Login