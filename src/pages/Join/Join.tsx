import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { routeVariants, routeTransition } from '../../animations/animations';
import Label from "../../components/form/Label/Label";
import Row from "../../components/form/Row/Row";
import TextInput from "../../components/form/TextInput/TextInput";
import GameSelect from "./components/GameSelect/GameSelect";
import classes from "./Join.module.scss"
import RankSelect from "./components/RankSelect/RankSelect";
import Submit from "../../components/form/Submit/Submit";
import axios from '../../axios/axios';
import { useHistory } from "react-router-dom";
import RoleSelect from "./components/RoleSelect/RoleSelect";
import ErrorReporter from "../ErrorPage/ErrorReporter";
import LoadingSpinner from "../../components/other/Spinner/Spinner";

const Join = () => {
    const history = useHistory();
    const [loaded, setLoaded] = useState<boolean>(true);
    const [invalidMessages, setInvalidMessages] = useState<string[]>([]);
    const [name, setName] = useState<string>();
    const [role, setRole] = useState<string>();
    const [gameId, setGameId] = useState<number|null>(null);
    const [nick, setNick] = useState<string>();
    const [rank, setRank] = useState<number>();
    const [maxRank, setMaxRank] = useState<number>();
    const joinString = (new URL(window.location.href)).searchParams.get("joinstring");
    const teamId = (new URL(window.location.href)).searchParams.get("teamid");
    useEffect(function() {
        if((new URL(window.location.href)).searchParams.get("gameid")){
            setGameId(Number((new URL(window.location.href)).searchParams.get("gameid")));
        }
    },[]);

    async function onError(error: any){
        if(error.response){
            if(error.response.data){
                if(error.response.status === 403){
                    if(error.response.data.msg === "Team full or you are in another team for this game."){
                        ErrorReporter("Tým je plný nebo již jste v jiném týmu pro tuto hru.");
                    }else{
                        ErrorReporter("Neznámá chyba. Zkuste akci opakovat později.", error.response.status);
                    }
                }else if(error.response.status === 404){
                    if(error.response.data.msg === "You havent filled info required for creating Team."){
                        ErrorReporter("Nemáte zadané informace potřebné k připojení k týmu. Nastavte je v záložce Váš profil.");
                    }else{
                        ErrorReporter("Neznámá chyba. Zkuste akci opakovat později.", error.response.status);
                    }
                }else if(error.response.status === 410){
                    ErrorReporter("Registrace ještě nezačala nebo už byla ukončena.");
                }else{
                    ErrorReporter("Neznámá chyba. Zkuste akci opakovat později.", error.response.status);
                }
            }else{
                ErrorReporter("Neznámá chyba. Zkuste akci opakovat později.", error.response.status + " Odpověď nemá tělo.");
            }
        }else{
            ErrorReporter("Neznámá chyba. Zkuste akci opakovat později.");
        }
    }

    const onSubmitJoin = async function () {
        setInvalidMessages([]);

        if (!joinString) {
            setInvalidMessages(['Chybí joinString.'])
            return;
        }
        if (!teamId) {
            setInvalidMessages(['Chybí teamId.']);
            return;
        }
        if (!gameId) {
            setInvalidMessages(['Chybí gameId.']);
            return;
        }
        if (!role) {
            setInvalidMessages(['Není vybrána role.']);
            return;
        }
        if (!nick) {
            setInvalidMessages(['Chybí přezdívka.']);
            return;
        }
        if (rank === undefined) {
            setInvalidMessages(['Není vybraný rank.']);
            return;
        }
        if (maxRank === undefined) {
            setInvalidMessages(['Není vybraný nejvyšší rank.']);
            return;
        }
        setLoaded(false);
        await axios("/team/id/" + teamId + "/join/" + joinString + "/", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "data": {
                "nick":nick,
                "rank": rank,
                "max_rank": maxRank,
                "role": role
            }
        }).catch(onError);
        history.push("/teams");
    }

    const onSubmitNewTeam = async function () {
        setInvalidMessages([]);

        if (!name) {
            setInvalidMessages(['Chybí název týmu.'])
            return;
        }
        if (!gameId) {
            setInvalidMessages(['Není vybrána hra.']);
            return;
        }
        if (!nick) {
            setInvalidMessages(['Chybí přezdívka.']);
            return;
        }
        if (rank === undefined) {
            setInvalidMessages(['Není vybraný rank.']);
            return;
        }
        if (maxRank === undefined) {
            setInvalidMessages(['Není vybraný nejvyšší rank.']);
            return;
        }
        setLoaded(false);
        await axios("/team/create/", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "data": {
                "name":name,
                "game_id": gameId,
                "nick":nick,
                "rank": rank,
                "max_rank": maxRank
            }
        }).catch(onError);
        history.push("/teams");
    }

    return <motion.div transition={routeTransition} key="join" variants={routeVariants} initial="initial" animate="visible" exit="hidden" className={classes.Join}>
        <div className={classes.Join__spacer}></div>
        {loaded && <div>
            { !(joinString && teamId) && <Row>
                <Label obligatory>Název týmu</Label>
                <TextInput value={name} setFunction={setName}></TextInput>
            </Row>}
            { !(joinString && teamId) && <Row>
                <Label obligatory>Hra</Label>
                <GameSelect setFunction={setGameId} currentGame={gameId}></GameSelect>
            </Row>}
            { (joinString && teamId) && <Row>
                <Label obligatory>Role</Label>
                <RoleSelect setFunction={setRole} currentRole={role}></RoleSelect>
            </Row>}
            <Row>
                <Label obligatory>Přezdívka</Label>
                <TextInput value={nick} setFunction={setNick}></TextInput>
            </Row>
            <Row>
                <Label obligatory>Rank</Label>
                <RankSelect curentRank={rank} setFunction={setRank} currentGame={gameId}></RankSelect>
            </Row>
            <Row>
                <Label obligatory>Nejvyšší rank</Label>
                <RankSelect curentRank={maxRank} setFunction={setMaxRank} currentGame={gameId}></RankSelect>
            </Row>
            {!(joinString && teamId) &&
                <Submit onClick={(e: any) => {
                    e.preventDefault();
                    onSubmitNewTeam();
                }}>Vytvořit tým</Submit>}
            { joinString && teamId &&
                <Submit onClick={(e: any) => {
                    e.preventDefault();
                    onSubmitJoin();
                }}>Připojit se k týmu</Submit>
            }
            {invalidMessages.length >= 1 &&
            <div className={classes.AloneForm__invalidMessages}>
                {invalidMessages.map((message, id) => {
                    return <div key={id} className={classes.AloneForm__invalidMessage}>
                        {message}
                    </div>
                })}
            </div>}
        </div>}
        {!loaded && <LoadingSpinner></LoadingSpinner>}
        <div className={classes.Join__spacer}></div>
    </motion.div>
};

export default Join;