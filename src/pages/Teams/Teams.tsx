import classes from './Teams.module.scss';
import axios from '../../axios/axios';
import {AxiosResponse} from 'axios'
import ErrorReporter from "../ErrorPage/ErrorReporter";
import { useContext, useState, useEffect } from 'react';
import { Context } from "../../store/context";
import { useLocation } from 'react-router';
import { useHistory } from "react-router-dom";
import TeamComponent from './components/TeamComponent/TeamComponent';
import Submit from '../../components/form/Submit/Submit';
import { motion } from 'framer-motion';
import { routeTransition, routeVariants } from "../../animations/animations";
import { Team, Error, GeneratedRole } from "../../types/types";


function Teams() {
    const history = useHistory();
    const location = useLocation();
    const context = useContext(Context);
    const [teams, setTeams] = useState<JSX.Element[]>([]);
    async function loadUsersTeams(){
        if(teams.length === 0){
            const userTeams: AxiosResponse<Team[] | Error> = await axios("/user/@me/teams/").catch(function(error){
                ErrorReporter("Nebylo možné vypsat Vaše týmy. Zkuste akci opakovat později.");
            });
            if ("kind" in userTeams.data) {
                console.error(userTeams.data);
                ErrorReporter("Nebylo možné vypsat Vaše týmy. Zkuste akci opakovat později.");
            }
            const roleList: AxiosResponse<GeneratedRole[] | Error> = await axios("/generatedRole/list/all/").catch(function(error){
                ErrorReporter("Nebylo možné vypsat role. Zkuste akci opakovat později.");
            });
            if ("kind" in roleList.data) {
                console.error(userTeams.data);
                ErrorReporter("Nebylo možné vypsat role. Zkuste akci opakovat později.");
            }
            let teamArray: JSX.Element[] = [];
            for(let index in userTeams.data){
                let element = userTeams.data[index];
                teamArray.push(
                    <div key={element.teamId} className={classes.TeamsUI__teamholder}>
                        <TeamComponent generatedRoles={roleList.data} teamName={element.name} teamId={element.teamId} joinString={element.joinString} gameId={element.gameId}></TeamComponent>
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