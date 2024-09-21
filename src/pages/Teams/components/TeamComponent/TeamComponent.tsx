import InviteLink from './components/InviteLink/InviteLink';
import LeaveBtn from './components/LeaveBtn/LeaveBtn';
import TeamMember from './components/TeamMember/TeamMember';
import classes from './TeamComponent.module.scss';
import axios from '../../../../axios/axios';
import {AxiosResponse} from 'axios'
import ErrorReporter from "../../../ErrorPage/ErrorReporter";
import { useHistory } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import { Team, ApiError, GeneratedRole, GeneratedRolePermission} from "../../../../types/types";
import { Context } from "../../../../store/context";


interface TeamComponentProps {
    teamName: string,
    teamId: number,
    joinString?: string,
    gameId: number,
    generatedRoles: GeneratedRole[],
}

const TeamComponent: React.FC<TeamComponentProps> = (props) => {
    const history = useHistory();
    const context = useContext(Context);

    const [teams, setTeams] = useState<JSX.Element[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [canGenerateJoinString, setCanGenerateJoinString] = useState<boolean>(false);
    async function teamMembers(teamId:number){
        const teamData: AxiosResponse<Team, ApiError> = await axios("/team/id/" + teamId + "/").catch(function(error){
            ErrorReporter("Chyba výpisu detailu týmu. Zkuste akci opakovat později.");
        });
        if ("kind" in teamData.data) {
            console.error(teamData.data);
            ErrorReporter("Chyba výpisu detailu týmu. Zkuste akci opakovat později.");
        }
        const teamsResponse = teamData.data;
        const user = teamsResponse.Players.find((player) => { return player.userId === context.state.discordId })
        if (user === undefined) {
            ErrorReporter("Uživatel není součástí týmu. Zkuste akci opakovat později.");
        }
        
        const permission: AxiosResponse<GeneratedRolePermission[], Error> = await axios("/generatedRole/"+user.generatedRoleId+"/permissions/").catch(function(error){
            ErrorReporter("Chyba výpisu detailu týmu. Zkuste akci opakovat později.");
        });
        if ("kind" in permission.data) {
            console.error(permission.data);
            ErrorReporter("Chyba výpisu detailu oprávnění. Zkuste akci opakovat později.");
        }
        const canKick = permission.data.find((perm) => { return perm.permission === "team.kickTeam" }) !== undefined
        setCanGenerateJoinString(permission.data.find((perm) => { return perm.permission === "team.generateJoinStringMy" }) !== undefined);

        const tmpTeams: JSX.Element[] = [];
        teamsResponse.Players.forEach(player => {
            tmpTeams.push(
                <TeamMember key={player.userId} name={player.nick} useId={player.userId} teamId={teamId} role={props.generatedRoles.find((role) =>{return role.generatedRoleId === player.generatedRoleId})?.roleName} canKick={canKick} kickFunction={function() {
                    axios.delete("/team/id/"+ props.teamId +"/kick/"+ player.userId +"/").catch(function(error){
                        ErrorReporter("Nepodařilo se odstranit uživatele. Zkuste akci opakovat později.");
                    });
                    history.push("/teams");
                }}/>
            );
        });
        setTeams(tmpTeams);
    }
    function makeVisible(){
        setVisible(!visible)
    }
    useEffect(function () {
        if (context.state.discordId !== undefined && context.state.schools !== null) {
            teamMembers(props.teamId)
        }
    }, [history, context, props.teamId]);

    return  <div className={classes.TeamUI}>
        <div className={classes.TeamUI__teamname} onClick={makeVisible}>
            <div className={classes.TeamUI__teamname__name}>{props.teamName}</div>
            <div className={classes.TeamUI__spacer}></div>
            <div className={classes.TeamUI__leave}><LeaveBtn onClick={async function(){
                axios.delete("/team/id/"+ props.teamId +"/kick/@me/").catch(function(error){
                    ErrorReporter("Neaznámá chyba. Zkuste akci opakovat později.");
                });
                window.location.reload();
            }} /></div>
        </div>
        <div>
            {visible &&
                <div className={classes.TeamUI__members}>
                    {teams}
                </div>
            }
            { visible && canGenerateJoinString  && <InviteLink className={classes.TeamUI__inviteLink} link={props.joinString} teamId={props.teamId} gameId={props.gameId}/>}
        </div>
    </div>
}

export default TeamComponent;