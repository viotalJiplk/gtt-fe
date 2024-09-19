import { useEffect, useState } from 'react';
import axios from '../../../../../../axios/axios';
import GenerateLinkBtn from './components/GenerateLinkBtn/GenerateLinkBtn';
import classes from './InviteLink.module.scss';
import ErrorReporter from "../../../../../ErrorPage/ErrorReporter";

interface InviteProps {
    teamId: number,
    gameId: number,
    link?: string,
}

function generateJoinLink(joinString:string, teamId:number, gameId:number){
    let url = new URL(window.location.protocol + window.location.host + "/join");
    url.searchParams.set("teamid", String(teamId));
    url.searchParams.set("gameid", String(gameId));
    url.searchParams.set("joinstring", joinString);
    return url.href;
}

const InviteLink: React.FC<InviteProps> = function (props) {
    const [joinString, setJoinString] = useState<string>();
    useEffect(function() {
        if(props.link !== undefined && props.link !== null){
            setJoinString(generateJoinLink(props.link, props.teamId, props.gameId));
        }
    // eslint-disable-next-line
    },[]);
    
    return (
        <div className={classes.InviteLink}>
            <div className={classes.InviteLink__link}>{joinString}</div>
            <div>
                <GenerateLinkBtn onClick={async function(event: Event) {
                    const linkRes = await axios.get("/team/id/"+ props.teamId +"/joinString/").catch(function(error){
                        ErrorReporter("Neaznámá chyba. Zkuste akci opakovat později.");
                    });
                    if(linkRes !== undefined && linkRes !== null){
                        setJoinString(generateJoinLink(linkRes.data.joinString, props.teamId, props.gameId));
                    }
                }} />
            </div>
        </div>
    )
}

export default InviteLink;