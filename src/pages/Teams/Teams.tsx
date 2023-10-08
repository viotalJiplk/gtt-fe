import classes from './Teams.module.scss';
import axios from '../../axios/axios';
import ErrorReporter from "../ErrorPage/ErrorReporter";
import { useContext, useState, useEffect } from 'react';
import { Context } from "../../store/context";
import { useLocation } from 'react-router';
import { useHistory } from "react-router-dom";
import TeamComponent from './components/TeamComponent/TeamComponent';
import Submit from '../../components/form/Submit/Submit';
import { motion } from 'framer-motion';
import { routeTransition, routeVariants } from "../../animations/animations";

function Teams() {
    const history = useHistory();
    const location = useLocation();
    const context = useContext(Context);
    const [teams, setTeams] = useState<JSX.Element[]>([]);
    async function loadUsersTeams(){
        if(teams.length === 0){
            const userTeams = await axios("/team/list/@me/").catch(function(error){
                ErrorReporter("Neaznámá chyba. Zkuste akci opakovat později.");
                return error;
            });;
            let teamArray:any = [];
            for(let index in userTeams.data){
                let element = userTeams.data[index];
                teamArray.push(
                    <div key={element.teamId} className={classes.TeamsUI__teamholder}>
                        <TeamComponent teamName={element.name} teamId={element.teamId} role={element.role} joinString={element.joinString} gameId={element.gameid}></TeamComponent>
                    </div>
                );
            }
            setTeams(teamArray);
        }
    }

    useEffect(()=>{
        if (context.state.discordId !== "notLoggedIn" && context.state.discordId !== "") {
            loadUsersTeams();
        }else if(context.state.discordId === "notLoggedIn"){
            localStorage.setItem("afterlogin", location.pathname);
            history.push("/account");
        }
    // eslint-disable-next-line
    }, [context]);

    return (<motion.div className={classes.TeamsUI} key="teams" variants={routeVariants} transition={routeTransition} exit="hidden" animate="visible" initial="initial">
            <div className={classes.TeamsUI__spacer}></div>
            <div className={classes.TeamsUI__teamholders}>
                <Submit className={classes.TeamsUI__newbutton} onClick={function(){history.push("/join")}}>Nový tým</Submit>
                {teams}
            </div>
            <div className={classes.TeamsUI__spacer}></div>
    </motion.div>)
}

export default Teams;