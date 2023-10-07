import InviteLink from './components/InviteLink/InviteLink';
import LeaveBtn from './components/LeaveBtn/LeaveBtn';
import TeamMember from './components/TeamMember/TeamMember';
import classes from './TeamComponent.module.scss';
import axios from '../../../../axios/axios';
import ErrorReporter from "../../../ErrorPage/ErrorReporter";
import { useHistory} from 'react-router';
import { useEffect, useState } from 'react';


interface TeamComponentProps {
    teamName: string,
    teamId: number,
    role: string,
    joinString: string,
    gameId: number
}

const TeamComponent: React.FC<TeamComponentProps> = (props) => {
    const history = useHistory();

    const [teams, setTeams] = useState<JSX.Element[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    async function TeamMembers(teamId:number, role:string){
        const teamData = await axios("/team/id/" + teamId + "/").catch(function(error){
            ErrorReporter("Neaznámá chyba. Zkuste akci opakovat později.");
        });
        const tmpTeams:JSX.Element [] = [];
        console.log(teamData);
        // @ts-expect-error
        teamData.data.Players.forEach(player => {
            tmpTeams.push(
                <TeamMember name={player.nick} useId={player.userid} teamId={teamId} role={player.role} canKick={role === "Captain"} kickFunction={function() {}}/>
            );
        });
        setTeams(tmpTeams);
    }
    function makeVisible(){
        setVisible(!visible)
    }

    useEffect(function() {
        TeamMembers(props.teamId, props.role)
    // eslint-disable-next-line
    }, [history]);

    return  <div className={classes.TeamUI}>
        <div className={classes.TeamUI__teamname} onClick={makeVisible}>
            <div>{props.teamName}</div>
            <div className={classes.TeamUI__spacer}></div>
            <div className={classes.TeamUI__leave}><LeaveBtn onClick={async function(){
                axios.delete("/team/id/"+ props.teamId +"/kick/@me").catch(function(error){
                    ErrorReporter("Neaznámá chyba. Zkuste akci opakovat později.");
                });;
                history.push("/teams");
            }} /></div>
        </div>
        <div>
            {visible &&
                <div className={classes.TeamUI__members}>
                    {teams}
                </div>
            }
            { visible && props.role === "Captain" && <InviteLink link={props.joinString} teamId={props.teamId} gameId={props.gameId}/>}
        </div>
    </div>
}

export default TeamComponent;