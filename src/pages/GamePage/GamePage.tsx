import { routeVariants, routeTransition } from '../../animations/animations';
import { motion } from 'framer-motion';
import classes from './GamePage.module.scss'

import { useContext, useEffect, useState } from 'react';
import { Context } from '../../store/context';
import Heading from '../../components/typography/Heading';
import { headingTypes } from '../../types/types';
import axios from '../../axios/axios';
import { AxiosResponse } from 'axios';
import MarkdownGamePageProps from './components/MarkdownGamePage/MarkdownGamePage';
import { GeneratedRole, Game} from '../../types/types';


const GamePage = () => {
    const context = useContext(Context);
    const url = new URL(window.location.href);
    const gameName = url.searchParams.get("gamename");
    const [generatedRoles, setGeneratedRoles] = useState<JSX.Element[] | null>(null);
    const [gameRegistration, setGameRegistration] = useState<string>();
    const [minmax, setMinmax] = useState<JSX.Element[]>([]);
    const [markdownPage, setMarkdownPage] = useState<JSX.Element | null>(null);
    const [game, setGame] = useState<Game|null>(null);
    
    function formatDate(date: Date){
        return String(date.getDate()) + ". " + String(date.getMonth()+1) + ".";
    }
  
    useEffect(() => {
        if (game !== null) {
            axios.get(`/generatedRole/list/${game.gameId}/`).then((response: AxiosResponse<Error|GeneratedRole[]>) => {
                if (Array.isArray(response.data)) {
                    let generatedRoleTmp: JSX.Element[] = [];
                    for (let role of response.data) {
                        generatedRoleTmp.push(<tr><td>{role.roleName}</td><td>{String(role.minimal)}</td><td>{String(role.maximal)}</td></tr>)
                    }
                    setGeneratedRoles(generatedRoleTmp);
                } else {
                    console.error("Wrong response");
                    console.error(response);
                }
            });
        }
    }, [game])

    useEffect(()=>{
        if(generatedRoles !== null){
            // @ts-expect-error
            let registrationStart = new Date(game.registrationStart);
            // @ts-expect-error
            let registrationEnd = new Date(game.registrationEnd);
            setGameRegistration(formatDate(registrationStart) + " 23:59 - " + formatDate(registrationEnd) + " 00:00 ");
            setMinmax([<table className={classes.GamePage__table}>
                <thead>
                    <tr>
                    <th>Role</th>
                    <th>minimální počet</th>
                    <th>maximální počet</th>
                    </tr>
                </thead>
                <tbody>
                    {generatedRoles}
                </tbody>
                </table>]);
        }
    // eslint-disable-next-line
    }, [generatedRoles]);
    useEffect(()=>{
        if(context.state.games !== undefined){
            for(let game of context.state.games){
                if (game.name === gameName) {
                    setGame(game);
                    setMarkdownPage(<MarkdownGamePageProps gameId={game.gameId}></MarkdownGamePageProps>)
                }
            }
        }
    // eslint-disable-next-line
    }, [context]);

    return (
        <motion.div key="home" transition={routeTransition} variants={routeVariants} initial="initial" animate="visible" exit="hidden" className={classes.GamePage}>
            <Heading className={classes.GamePage__h1} type={headingTypes.h1}>{game?.name}</Heading>
            <Heading className={classes.GamePage__h2} type={headingTypes.h3}>Registrace: {gameRegistration}</Heading>
            <Heading className={classes.GamePage__h2} type={headingTypes.h3}>Maximální počet týmů: {game?.maxTeams}</Heading>
            <div>
                {minmax}
            </div>
            {markdownPage}
        </motion.div>
    )
}
export default GamePage;