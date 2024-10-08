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
import { Rank } from '../../types/types';
import { Context } from '../../store/context';
import LoadingSpinner from '../../components/other/Spinner/Spinner';
import CheckBoxInput from '../../components/form/CheckBoxInput/CheckBoxInput';
import { GeneratedRole, ApiError } from '../../types/types';

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
    const [tableHead, setTableHead] = useState<JSX.Element[]>([]);
    const [allRanks, setAllRanks] = useState<Rank[] | null>(null);
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

    async function getRanks(gameId: number) {
        let res = await fetch(`/backend/rank/list/${gameId}/`);
        setAllRanks(await res.json());
    }

    useEffect(()=>{
        if((gameId !== null)){
            getRanks(gameId);
        }
    }, [gameId]);
    
    function getRankByRankId(id: Number) {
        if (allRanks === null) {
            throw new Error("AllRanks cannot be null when calling getRankByRankId.")
        }
        for(let rank of allRanks){
            if(rank.rankId === id){
                return rank;
            }
        }
        return undefined;
    }

    function roleNameFromId(id: Number, generatedRoles: GeneratedRole[]) {
        return generatedRoles.find(role => role.generatedRoleId === id)?.roleName;
    }

    useEffect(() => {
        if(gameId != null && context.state.games !== undefined && generatedRoles !== null && allRanks !== null){
            setLoading(true);
            axios.get('/team/list/participating/'+ gameId +'/' + withDiscord + '/').then(response => {
                let tmpTeams: TeamMember[][] = [[]];
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
                        let rank = undefined;
                        if (member.rank !== undefined) {
                            rank = getRankByRankId(member.rank);   
                        }
                        let maxRank = undefined;
                        if (member.maxRank !== undefined) {
                            maxRank = getRankByRankId(member.maxRank);   
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
                                    {
                                     rank? rank.rankName: "Neznámý rank"}
                                </td>
                            }
                            {member.maxRank !== undefined && tableHeadtmp.push(<th>Maximální rank</th>) &&
                                <td className={classes.Contestants__member__maxRank}>
                                    {
                                     maxRank? maxRank.rankName: "Neznámý rank"}
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameId, context.state.games, withDiscord, generatedRoles, allRanks]);
    useEffect(() => {
        if (gameId !== null) {
            axios.get(`/generatedRole/list/${gameId}/`).then((response: AxiosResponse<ApiError|GeneratedRole[]>) => {
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
        </Section>
    </motion.div>
};

export default Contestants;