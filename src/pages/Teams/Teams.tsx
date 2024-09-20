import classes from './Teams.module.scss';
import axios from '../../axios/axios';
import { AxiosResponse } from 'axios';
import ErrorReporter from "../ErrorPage/ErrorReporter";
import { useContext, useState, useEffect } from 'react';
import { Context } from "../../store/context";
import { useLocation } from 'react-router';
import { useHistory } from "react-router-dom";
import TeamComponent from './components/TeamComponent/TeamComponent';
import GreenButton from '../../components/layout/Buttons/Green/Green';
import { motion } from 'framer-motion';
import { routeTransition, routeVariants } from "../../animations/animations";
import { Team, ApiError, GeneratedRole } from "../../types/types";


function Teams() {
    const history = useHistory();
    const location = useLocation();
    const context = useContext(Context);
    const [teams, setTeams] = useState<JSX.Element[]>([]);
    async function loadUsersTeams() {
        if (context.state.games === undefined) {
            throw new Error("context.state.games cannot be undefined when calling loadUsersTeams");
        }
        if(teams.length === 0){
            const userTeamsRequest: AxiosResponse<Team[] | ApiError> = await axios("/user/@me/teams/").catch(function(error){
                ErrorReporter("Nebylo možné vypsat Vaše týmy. Zkuste akci opakovat později.");
            });
            if ("kind" in userTeamsRequest.data) {
                console.error(userTeamsRequest.data);
                ErrorReporter("Nebylo možné vypsat Vaše týmy. Zkuste akci opakovat později.");
            }
            const userTeams: Team[][] = [];
            for (let team of userTeamsRequest.data) {
                if (userTeams[team.gameId] === undefined) {
                    userTeams[team.gameId] = [];
                }
                userTeams[team.gameId].push(team);
            }
            const roleList: AxiosResponse<GeneratedRole[] | ApiError> = await axios("/generatedRole/list/all/").catch(function(error){
                ErrorReporter("Nebylo možné vypsat role. Zkuste akci opakovat později.");
            });
            if ("kind" in roleList.data) {
                console.error(roleList.data);
                ErrorReporter("Nebylo možné vypsat role. Zkuste akci opakovat později.");
            }
            let teamArray: JSX.Element[] = [];
            for (let index in userTeams) {
                let game = context.state.games.find((game) => { return game.gameId === Number(index) });
                if (game === undefined) {
                    throw new Error("Game " + index + " does not exist");
                }
                teamArray.push(<div className={classes.TeamsUI__gameName}>{game.name}</div>);
                for (let element of userTeams[index]) {
                    teamArray.push(
                        <div key={element.teamId} className={classes.TeamsUI__teamholder}>
                            <TeamComponent generatedRoles={roleList.data} teamName={element.name} teamId={element.teamId} joinString={element.joinString} gameId={element.gameId}></TeamComponent>
                        </div>
                    );
                }
            }
            setTeams(teamArray);
        }
    }

    useEffect(()=>{
        if (context.state.discordId !== "notLoggedIn" && context.state.discordId !== "" && context.state.games !== undefined && context.state.games.length > 0) {
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
                <GreenButton className={classes.TeamsUI__newbutton} onClick={function(){history.push("/join")}}>Nový tým</GreenButton>
                {teams}
            </div>
            <div className={classes.TeamsUI__spacer}></div>
    </motion.div>)
}

export default Teams;