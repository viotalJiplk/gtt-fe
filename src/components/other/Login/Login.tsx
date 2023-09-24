import { ProfileIcon } from "../Assets/Assets";

async function loginFunction(){
    window.location.href = "/account";
}

const Login = () =>{
    return <div onClick={loginFunction}><ProfileIcon></ProfileIcon></div>
}

export default Login