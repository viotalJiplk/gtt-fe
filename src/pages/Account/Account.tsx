import classes from './Account.module.scss';
import { headingTypes } from '../../types/types';
import Heading from '../../components/typography/Heading';
import { motion } from 'framer-motion';
import { routeVariants, routeTransition } from '../../animations/animations';
import { useState, useContext, useEffect } from "react";
import { Context } from "../../store/context";
import Row from './components/Row/Row';
import Label from './components/Label/Label';
import TextInput from './components/TextInput/TextInput';
import AdultSelect from "./components/AdultSelect/AdultSelect";
import SchoolSelect from "./components/SchoolSelect/SchoolSelect";
import Submit from "./components/Submit/Submit";
import Agreement from "./components/Agreement/Agreement";
import axios from '../../axios/axios';
import Loading from "../../components/other/Spinner/Spinner";
import ErrorReporter from "../ErrorPage/ErrorReporter";

const Account = () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [school, setSchool] = useState(null);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [adult, setIsAdult] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [invalidMessages, setInvalidMessages] = useState<string[]>([]);

    const context = useContext(Context);
    useEffect(() => {
        if (context.state.discordId !== "") {
            if (context.state.discordId !== "notLoggedIn") {
                infoLookUp().then(() => { setLoaded(true) });
            } else if((url === null) || (code === null) || (state === null)){
                startLoginChain();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context])
    useEffect(() => {
        if ((url !== null) && (code !== null) && (state !== null)) {
            getToken(code, state);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function infoLookUp() {
        let axiosResponse = await axios("/user/@me/", { responseType: "json" }).catch(function (error) {
            localStorage.removeItem("jwt");
            ErrorReporter("Nejste přihlášeni, nebo nemáte dostatečná práva");
            return error;
        });
        let response = JSON.parse(axiosResponse.data);
        if (response.schoolId !== null) {
            setSchool(response.schoolId);
        }
        if (response.name !== "\"\"") {
            setName(response.name);
        }
        if (response.surname !== "\"\"") {
            setSurname(response.surname);
        }
        if (response.adult !== "\"\"") {
            setIsAdult(response.adult);
        }

    }

    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    async function startLoginChain() {
        let axiosResponse = await (axios("/discord/auth", { responseType: "json" }).catch(function (error) {
            if(error.response.status !== 200){
                ErrorReporter("Služba pravděpodobně není dostupná. Zkuste akci opakovat za chvíli.");
            }else{
                return error.response;
            }
        }));

        const redirectUrl = new URL(axiosResponse.data.redirect_url )
        let newUrl = window.location.origin + "/account";
        if (newUrl.includes("localhost")) {
            newUrl = newUrl.replace("localhost", "127.0.0.1");
        }
        redirectUrl.searchParams.set("redirect_uri", newUrl);
        window.location.href = redirectUrl.href;
    }

    async function getToken(code: string, state: string) {
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
            "data": data
        }).catch(function (error) {
            if(error.response.status === 401){
                ErrorReporter("Pravdravděpodobně došlo k restartu serveru. Zkuste akci opakovat.");
            }else if(error.response.status !== 200){
                ErrorReporter("Neznámá chyba.");
            }else{
                return error.response;
            }
        });
        localStorage.setItem("jwt", response.data.jws);
        window.location.href = "/account"
    }

    const onSubmit = async function () {
        setInvalidMessages([]);

        if (!school) {
            setInvalidMessages(['Škola není zadaná nebo není použitá možnost z výběru.'])
            return;
        }
        if (!agreed) {
            setInvalidMessages(['Je nutno souhlasit se všemi souhlasy']);
            return;
        }
        if (!name) {
            setInvalidMessages(['Je nutno souhlasit se všemi souhlasy']);
            return;
        }
        if (!surname) {
            setInvalidMessages(['Je nutno souhlasit se všemi souhlasy']);
            return;
        }

        await axios("/user/@me/", {
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json"
            },
            "data": {
                "name": name,
                "surname": surname,
                "adult": agreed,
                "school_id": school
            }
        }).catch(function (error) {
            if(error.response.status === 401){
                ErrorReporter("Pravdravděpodobně došlo k restartu serveru. Zkuste akci opakovat.");
            }else if(error.response.status === 404){
                setInvalidMessages(["Nic nebylo změněno."]);
                return;
            }else if(error.response.status !== 205){
                ErrorReporter("Neznámá chyba.");
            }else{
                window.location.href = "/account"
            }
        });
    }

    return <motion.div transition={routeTransition} key="registration" variants={routeVariants} initial="initial" animate="visible" exit="hidden" className={classes.Registration}>
        {!loaded && <Loading></Loading>}
        {loaded && <div>
            <Heading className={classes.Registration__heading} type={headingTypes.main}>Vaše údaje</Heading>
            <Row>
                <Label obligatory>Jméno</Label>
                <TextInput value={name} setFunction={setName}></TextInput>
            </Row>
            <Row>
                <Label obligatory>Příjmení</Label>
                <TextInput value={surname} setFunction={setSurname}></TextInput>
            </Row>
            <AdultSelect value={adult} setFunction={(value: boolean) => {
                setIsAdult(value);
            }}></AdultSelect>
            <Agreement setFunction={setAgreed}></Agreement>
            <SchoolSelect label={'Škola, za kterou bude tým hrát (musí být položka ze seznamu)'} currentSchool={school} setFunction={setSchool} className={classes.AloneForm__schoolSelect}></SchoolSelect>
            <Submit className={classes.TeamForm__submit} onClick={(e: any) => {
                e.preventDefault();
                onSubmit();
            }}></Submit>
            {invalidMessages.length >= 1 &&
                <div className={classes.AloneForm__invalidMessages}>
                    {invalidMessages.map((message, id) => {
                        return <div key={id} className={classes.AloneForm__invalidMessage}>
                            {message}
                        </div>
                    })}
                </div>}
        </div>}
    </motion.div>
}

export default Account;