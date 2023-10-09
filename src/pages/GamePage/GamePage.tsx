import { routeVariants, routeTransition } from '../../animations/animations';
import { motion } from 'framer-motion';
import classes from './GamePage.module.scss'

import { useContext, useEffect, useState } from 'react';
import { Context } from '../../store/context';
import { GAMENAMES } from '../../constants/constants';
import Heading from '../../components/typography/Heading';
import { headingTypes } from '../../types/types';
import MarkdownPage from './components/MarkdownPage/MarkdownPage';


const GamePage = () => {
    const context = useContext(Context);
    const url = new URL(window.location.href);
    const gameName = url.searchParams.get("gamename");
    const gameDisplay = gameName?GAMENAMES[gameName]: "";
    const [gameRegistration, setGameRegistration] = useState<string>();
    const [minmax, setMinmax] = useState<JSX.Element[]>([]);
    const [gameId, setGameId] = useState<number>(NaN);
    
    function formatDate(date: Date){
        return String(date.getDate()) + ". " + String(date.getMonth()+1) + ".";
    }

    useEffect(()=>{
        if(context.state.games !== undefined){
            for(let game in context.state.games){
                game=context.state.games[game];
                // @ts-expect-error
                if(game.name === gameName){
                    // @ts-expect-error
                    setGameId(game.gameId);
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
                          <tr>
                            <td>Kapitán</td>
                            <td>{// @ts-expect-error
                            game.minCaptains}</td>
                            <td>{// @ts-expect-error
                            game.maxCaptains}</td>
                          </tr>
                          <tr>
                            <td>Člen</td>
                            <td>{// @ts-expect-error
                            game.minMembers}</td>
                            <td>{// @ts-expect-error
                            game.maxMembers}</td>
                          </tr>
                          <tr>
                            <td>Záložník</td>
                            <td>{// @ts-expect-error
                            game.minReservists}</td>
                            <td>{// @ts-expect-error
                            game.maxReservists}</td>
                          </tr>
                        </tbody>
                       </table>]);
                }
            }
        }
    // eslint-disable-next-line
    }, [context]);

    return (
        <motion.div key="home" transition={routeTransition} variants={routeVariants} initial="initial" animate="visible" exit="hidden" className={classes.Home}>
            <Heading className={classes.GamePage__h1} type={headingTypes.h1}>{gameDisplay}</Heading>
            <Heading className={classes.GamePage__h2} type={headingTypes.h3}>Registrace: {gameRegistration}</Heading>
            <div>
                {minmax}
            </div>
            <MarkdownPage gameId={gameId}></MarkdownPage>
        </motion.div>
    )
}
export default GamePage;