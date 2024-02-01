import classes from './Token.module.scss';
import { motion } from 'framer-motion';
import { routeVariants, routeTransition } from '../../animations/animations';
import axios from '../../axios/axios';
import Loading from "../../components/other/Spinner/Spinner";
import ErrorReporter from "../ErrorPage/ErrorReporter";

const Token = () => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    window.history.replaceState({}, document.title, "/token");
    if ((url !== null) && (code !== null) && (state !== null)) {
        getToken(code, state);
    }

    async function getToken(code: string, state: string) {
        console.log("rerender")
        let data = {
            "code": code,
            "state": state,
            "redirect_uri": window.location.href.split("?")[0],
        }
        let response = await axios("/discord/token", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "data": data,
            //@ts-expect-error
            skipAuthRefresh: true 
        }).catch(function (error) {
            if(error.response.status === 401){
                ErrorReporter("Pravdravděpodobně došlo k restartu serveru. Zkuste akci opakovat.");
            }else if(error.response.status !== 200){
                ErrorReporter("Neznámá chyba.");
            }else{
                return error.response;
            }
        });
        if(response){
            localStorage.setItem("jwt", response.data.jws);
            localStorage.setItem("userObject", JSON.stringify(response.data.userObject));
            if(localStorage.getItem("afterlogin") !== null){
                const url = localStorage.getItem("afterlogin");
                localStorage.removeItem("afterlogin");
                //we force reload, so the new jwt would load before we start the code on page
                if(url === "exit"){
                    window.close();
                }else{
                    // @ts-expect-error
                    window.location.href = url;
                }
            }else{
                window.location.href = "/account";
            }
        }
    }

    return <motion.div transition={routeTransition} key="token" variants={routeVariants} initial="initial" animate="visible" exit="hidden" className={classes.Registration}>
        <Loading></Loading>
        
    </motion.div>
}

export default Token;