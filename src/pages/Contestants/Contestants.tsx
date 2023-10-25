import classes from './Contestants.module.scss';
import Heading from '../../components/typography/Heading';
import { routeTransition, routeVariants } from '../../animations/animations';
import { motion } from 'framer-motion';
import Section from '../../components/layout/Section/Section';
import { useEffect, useState } from 'react';
import axios from '../../axios/axios';
import { headingTypes } from '../../types/types';
import GameSelect from '../../components/form/GameSelect/GameSelect';

const Contestants = () => {
    const [gameId, setGameId] = useState<number|null>(null);
    const [teamsElement, setTeamsElement] = useState<JSX.Element[]>([]);
    useEffect(() => {
        if(gameId != null){
            axios.get('/team/list/participating/'+ gameId +'/').then(response => {
                let tmpTeamElements: JSX.Element[] = [];
                // @ts-expect-error 
                response.data.forEach(team => {
                    tmpTeamElements.push(<div className={classes.Contestants__team}>
                        <p className={classes.Contestants__team__name}>{team.name}</p>
                    </div>);
                });
                setTeamsElement(tmpTeamElements);
            })
        }
    }, [gameId]);
   
    return <motion.div variants={routeVariants} key="contestants" transition={routeTransition} exit="hidden" animate="visible" initial="initial" className={classes.Contestants}>
        <Section className={''}>
            <Heading type={headingTypes.main} className={classes.Contestants__heading}>Týmy účastnící se turnaje</Heading>
            <div className={classes.Contestants__gameSelect}>
                <p className={classes.Contestants__gameLabel}>Hra:</p>
                <GameSelect setFunction={setGameId} currentGame={gameId} className={classes.Contestants__gameSelectSellector}></GameSelect>
            </div>
            {teamsElement}
        </Section>
    </motion.div>
};

export default Contestants;