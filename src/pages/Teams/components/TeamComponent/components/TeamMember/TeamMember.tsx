import classes from './TeamMember.module.scss';
import KickBtn from './components/KickBtn/KickBtn';

interface MemberProps {
    kickFunction: Function,
    name: string,
    useId: string,
    teamId: number,
    role?: string,
    canKick: boolean
}

const TeamMember: React.FC<MemberProps> = function (props) {
    return (
        <div className={classes.TeamMember}>
            <div className={classes.TeamMember__memberName}>{props.name}</div>
            <div className={classes.TeamMember__role}>{props.role || ""}</div>
            {props.canKick && <KickBtn teamId={props.teamId} userId={props.useId}/>}
        </div>
    )
}

export default TeamMember;