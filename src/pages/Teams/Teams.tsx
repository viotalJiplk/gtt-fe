import classes from './Teams.module.scss';
import axios from '../../axios/axios';
import ErrorReporter from "../ErrorPage/ErrorReporter";
import { useContext, useState, useEffect } from 'react';
import { Context } from "../../store/context";
import { useHistory, useLocation } from 'react-router';
import TeamComponent from './components/TeamComponent/TeamComponent';

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
                    <div className={classes.TeamsUI__teamholder}>
                        <TeamComponent teamName={element.name} teamId={element.teamId} role={element.role} joinString={element.joinString} gameId={element.gameid}></TeamComponent>
                    </div>
                );
            }
            setTeams(teamArray);
        }
    }
    // useEffect(function(){
    //     Array.from(document.getElementsByClassName(classes.TeamsUI__teamname)).forEach(element => {
    //         if(!element.hasAttribute("data-haslis")){
    //             // @ts-ignore
    //             element.nextElementSibling.style.display = "none";
    //             element.setAttribute("data-haslis", "true");
    //             element.addEventListener("click", function (event:Event) {
    //                 // @ts-ignore
    //                 if(event.currentTarget.nextElementSibling.style.display === "none"){
    //                     // @ts-ignore
    //                     event.currentTarget.nextElementSibling.style.display = "block";
    //                 }else{
    //                     // @ts-ignore
    //                     event.currentTarget.nextElementSibling.style.display = "none";
    //                 }
    //             });
    //         }
    //     });
    // });

    useEffect(()=>{
        if (context.state.discordId !== "notLoggedIn" && context.state.discordId !== "") {
            loadUsersTeams();
        }else if(context.state.discordId === "notLoggedIn"){
            localStorage.setItem("afterlogin", location.pathname);
            history.push("/account");
        }
    // eslint-disable-next-line
    }, [context]);

    return (
        <div className={classes.TeamsUI}>
            <div className={classes.TeamsUI__spacer}></div>
            <div className={classes.TeamsUI__teamholders}>
                {teams}
            </div>
            <div className={classes.TeamsUI__spacer}></div>
        </div>
    )
}

export default Teams;