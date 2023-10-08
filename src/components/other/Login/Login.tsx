import { ProfileIcon } from "../Assets/Assets";
import { useHistory } from "react-router-dom";



const Login = () =>{
    const history = useHistory();

    async function loginFunction(){
        history.push("/account");
    }

    return <div onClick={loginFunction}><ProfileIcon></ProfileIcon></div>
}

export default Login