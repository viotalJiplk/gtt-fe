import classes from './Contestants.module.scss';
import Heading from '../../components/typography/Heading';
import { routeTransition, routeVariants } from '../../animations/animations';
import { motion } from 'framer-motion';
import Section from '../../components/layout/Section/Section';
import { useContext, useEffect, useState } from 'react';
import axios from '../../axios/axios';
import { AxiosResponse } from 'axios';
import { headingTypes } from '../../types/types';
import GameSelect from '../../components/form/GameSelect/GameSelect';
import { Ranks } from '../../constants/constants';
import { Context } from '../../store/context';
import CTA from '../../components/layout/CTA/CTA';
import LoadingSpinner from '../../components/other/Spinner/Spinner';
import CheckBoxInput from '../../components/form/CheckBoxInput/CheckBoxInput';
import { GeneratedRole, Error } from '../../types/types';

interface discordUserObject{
    id: string;
    username: string;
    discriminator: string;
    global_name: string|"";
    avatar: string|"";
    bot?: boolean;
    system?: boolean;
    mfa_enabled?: boolean;
    banner?: string;
    accent_color?: number;
    locale?: string;
    verified?: boolean;
    email?: string|"";
    flags?: number;
    premium_type?: number;
    public_flags?: number;
    avatar_decoration_data?: string|"";
}

interface TeamMember{
    teamId: Number;
    name: String;
    nick: String;
    generatedRoleId: Number;
    userId?: Number;
    rank?: Number;
    maxRank?: Number;
    canPlaySince?: String;
    discordUserObject?: discordUserObject;
}

const Contestants = () => {
    const context = useContext(Context);
    const [gameId, setGameId] = useState<number | null>(null);
    const [generatedRoles, setGeneratedRoles] = useState<GeneratedRole[] | null>(null);
    const [withDiscord, setWithDiscord] = useState<boolean>(false);
    const [discord, setDiscord] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [teamsElement, setTeamsElement] = useState<JSX.Element[]>([]);
    const [teams, setTeams] = useState<TeamMember[]>([]);
    const [tableHead, setTableHead] = useState<JSX.Element[]>([]);
    // @ts-expect-error
    function groupBy(arr, properties) {
        // @ts-expect-error
        const grouped = arr.reduce((memo, x) => {
            // @ts-expect-error
            const key = properties.map(prop => x[prop]).join('_');
            if (!memo[key]) {
                memo[key] = [];
            }
            memo[key].push(x);
            return memo;
        }, {});

        // Convert the grouped object to an array of arrays
        const result = Object.entries(grouped).map(([key, value]) => value);

        return result;
    }

    function roleNameFromId(id: Number, generatedRoles: GeneratedRole[]) {
        return generatedRoles.find(role => role.generatedRoleId === id)?.roleName;
    }

    useEffect(() => {
        if(gameId != null && context.state.games !== undefined && generatedRoles !== null){
            setLoading(true);
            axios.get('/team/list/participating/'+ gameId +'/' + withDiscord + '/').then(response => {
                let tmpTeams: TeamMember[][] = [[]];
                setTeams(response.data);
                let tmpTeamElements: JSX.Element[] = [];
                // @ts-expect-error
                let groupedTeams: TeamMember[][] = groupBy(response.data, ['teamId']);
                tmpTeams = groupedTeams.sort((a, b) => {
                    if (a[0]['canPlaySince'] === undefined && a[0]['canPlaySince'] === undefined) return 0;
                    if (b[0]['canPlaySince'] === undefined) return -1;
                    if (a[0]['canPlaySince'] === undefined) return 1;
                    if (a[0]['canPlaySince'] < b[0]['canPlaySince'] ) return -1;
                    if (a[0]['canPlaySince']  > b[0]['canPlaySince'] ) return 1;
                    return 0;
                });
                for(let teamId in tmpTeams){
                    let team = tmpTeams[teamId];
                    tmpTeamElements.push(
                        <tr className={classes.Contestants__team}>
                        <td className={classes.Contestants__team__name}>{team[0].name}</td>
                        </tr>
                    );
                    for(let memberId in team){
                        let tableHeadtmp: JSX.Element[] = [<th>Přezdívka</th>, <th>role</th>];
                        let member = team[memberId];
                        if(member.userId !== undefined){
                            setDiscord(true);
                        }
                        tmpTeamElements.push(<tr className={classes.Contestants__member}>
                            <td className={classes.Contestants__member__name}>
                                {member.nick}
                            </td>
                            <td className={classes.Contestants__member__role}>
                                {roleNameFromId(member.generatedRoleId, generatedRoles)}
                            </td>
                            {member.userId && tableHeadtmp.push(<th>Discord Id</th>) &&
                                <td className={classes.Contestants__member__userId}>
                                    {String(member.userId)}
                                </td>
                            }
                            {member.rank !== undefined && tableHeadtmp.push(<th>Rank</th>) &&
                                <td className={classes.Contestants__member__rank}>
                                    {//@ts-expect-error
                                     member.rank !== 0?Ranks[context.state.games[gameId-1].name][member.rank]: "Žádný rank"}
                                </td>
                            }
                            {member.maxRank !== undefined && tableHeadtmp.push(<th>Maximální rank</th>) &&
                                <td className={classes.Contestants__member__maxRank}>
                                    {//@ts-expect-error
                                     member.maxRank !== 0?Ranks[context.state.games[gameId-1].name][member.maxRank]: "Žádný rank"}
                                </td>
                            }
                            {member.discordUserObject && member.discordUserObject.global_name && tableHeadtmp.push(<th>Discord Name</th>) &&
                                <td className={classes.Contestants__member__global_name}>
                                    {"@" + String(member.discordUserObject.global_name)}
                                </td>
                            }
                            {member.discordUserObject && !member.discordUserObject.global_name &&  member.discordUserObject.username && member.discordUserObject.discriminator !== "0" &&
                                <td className={classes.Contestants__member__old_name}>
                                    {member.discordUserObject.username + "#" + member.discordUserObject.discriminator}
                                </td>
                            }
                        </tr>);
                        setTableHead(tableHeadtmp);
                    }
                }
                setTeamsElement(tmpTeamElements);
                setLoading(false);
            });
        }
    }, [gameId, context.state.games, withDiscord, generatedRoles]);
    useEffect(() => {
        if (gameId !== null) {
            axios.get(`/generatedRole/list/${gameId}/`).then((response: AxiosResponse<Error|GeneratedRole[]>) => {
                if (Array.isArray(response.data)) {
                    setGeneratedRoles(response.data);
                  } else {
                    console.error("Wrong response");
                    console.error(response);
                  }
            });
        }
    },[gameId])
   
    return <motion.div variants={routeVariants} key="contestants" transition={routeTransition} exit="hidden" animate="visible" initial="initial" className={classes.Contestants}>
        <Section className={''}>
            <Heading type={headingTypes.main} className={classes.Contestants__heading}>Týmy účastnící se turnaje</Heading>
            <div className={classes.Contestants__gameSelect}>
                <p className={classes.Contestants__gameLabel}>Hra:</p>
                <GameSelect setFunction={setGameId} currentGame={gameId} className={classes.Contestants__gameSelectSellector}></GameSelect>
            </div>
            {discord &&
                <div className={classes.Contestants__discord}>
                    <CheckBoxInput setFunction={()=>{setWithDiscord(!withDiscord)}} checked={withDiscord}></CheckBoxInput>
                    <div>s discord jmény</div>
                </div>
            }
            {!loading && <table>
                <thead>
                    <tr>
                    {tableHead}
                    </tr>
                </thead>
                <tbody>
                {teamsElement}
                </tbody>
            </table>}
            {loading && <LoadingSpinner></LoadingSpinner>}
            <CTA className={classes.Contestants__cta} onClick={() =>{
                let csv: String = "";
                teams.forEach((element)=>{
                    if(element.discordUserObject){
                        if(element.discordUserObject.global_name){
                            //@ts-expect-error
                            element.discordUserObject = element.discordUserObject.global_name
                        }else{
                            //@ts-expect-error
                            element.discordUserObject = element.discordUserObject.username + "#" + element.discordUserObject.discriminator
                        }
                    }
                    if(element.rank){
                        //@ts-expect-error
                        element.rank = element.rank!==0?Ranks[context.state.games[gameId-1].name][element.rank]: "Žádný rank"
                    }
                    if(element.maxRank){
                        //@ts-expect-error
                        element.maxRank = element.maxRank!==0?Ranks[context.state.games[gameId-1].name][element.maxRank]: "Žádný rank"
                    }
                    //todo fix when name includes "
                    csv += '"'+Object.values(element).join('", "') + '"\n';
                });
                // @ts-expect-error
                let uriContent = "data:application/octet-stream," + encodeURIComponent(csv);
                window.open(uriContent, 'export');
            }}>
            Exportovat do csv
            </CTA>
        </Section>
    </motion.div>
};

export default Contestants;