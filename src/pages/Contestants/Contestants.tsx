import classes from './Contestants.module.scss';
import Heading from '../../components/typography/Heading';
import { routeTransition, routeVariants } from '../../animations/animations';
import { motion } from 'framer-motion';
import Section from '../../components/layout/Section/Section';
import { useContext, useEffect, useState } from 'react';
import axios from '../../axios/axios';
import { headingTypes } from '../../types/types';
import GameSelect from '../../components/form/GameSelect/GameSelect';
import { Ranks } from '../../constants/constants';
import { Context } from '../../store/context';
import CTA from '../../components/layout/CTA/CTA';

interface TeamMember{
    teamId: Number;
    name: String;
    nick: String;
    role: String;
    userId?: Number;
    rank?: Number;
    maxRank?: Number;
}

const Contestants = () => {
    const context = useContext(Context);
    const [gameId, setGameId] = useState<number|null>(null);
    const [teamsElement, setTeamsElement] = useState<JSX.Element[]>([]);
    const [teams, setTeams] = useState<TeamMember[]>([]);
    const [tableHead, setTableHead] = useState<JSX.Element[]>([]);
    // @ts-expect-error
    function groupBy(arr, property) {
        // @ts-expect-error
        return arr.reduce(function(memo, x) {
          if (!memo[x[property]]) { memo[x[property]] = []; }
          memo[x[property]].push(x);
          return memo;
        }, {});
      }

    useEffect(() => {
        if(gameId != null && context.state.games !== undefined){
            axios.get('/team/list/participating/'+ gameId +'/').then(response => {
                let tmpTeams: TeamMember[][] = [[]];
                setTeams(response.data);
                let tmpTeamElements: JSX.Element[] = [];
                tmpTeams = groupBy(response.data, 'teamId');
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
                        tmpTeamElements.push(<tr className={classes.Contestants__member}>
                            <td className={classes.Contestants__member__name}>
                                {member.nick}
                            </td>
                            <td className={classes.Contestants__member__role}>
                                {member.role === 'Captain' ? 'Kapitán' : member.role === 'Member' ? 'Hráč' : 'Záložník'}
                            </td>
                            {member.userId && tableHeadtmp.push(<th>Discord Id</th>) &&
                                <td className={classes.Contestants__member__userId}>
                                    {String(member.userId)}
                                </td>
                            }
                            {member.rank !== undefined && tableHeadtmp.push(<th>Rank</th>) &&
                                <td className={classes.Contestants__member__rank}>
                                    {//@ts-expect-error
                                     member.rank !== 0?Ranks[context.state.games[gameId].name][member.rank]: "Žádný rank"}
                                </td>
                            }
                            {member.maxRank !== undefined && tableHeadtmp.push(<th>Maximální rank</th>) &&
                                <td className={classes.Contestants__member__maxRank}>
                                    {//@ts-expect-error
                                     member.maxRank !== 0?Ranks[context.state.games[gameId].name][member.maxRank]: "Žádný rank"}
                                </td>
                            }
                        </tr>);
                        setTableHead(tableHeadtmp);
                    }
                }
                setTeamsElement(tmpTeamElements);
            })
        }
    }, [gameId, context.state.games]);
   
    return <motion.div variants={routeVariants} key="contestants" transition={routeTransition} exit="hidden" animate="visible" initial="initial" className={classes.Contestants}>
        <Section className={''}>
            <Heading type={headingTypes.main} className={classes.Contestants__heading}>Týmy účastnící se turnaje</Heading>
            <div className={classes.Contestants__gameSelect}>
                <p className={classes.Contestants__gameLabel}>Hra:</p>
                <GameSelect setFunction={setGameId} currentGame={gameId} className={classes.Contestants__gameSelectSellector}></GameSelect>
            </div>
            <table>
                <thead>
                    <tr>
                    {tableHead}
                    </tr>
                </thead>
                <tbody>
                {teamsElement}
                </tbody>
            </table>
            <CTA className={classes.Contestants__cta} onClick={() =>{
                let csv: String = "";
                teams.forEach((element)=>{
                    csv += Object.values(element).join(', ') + "\n";
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