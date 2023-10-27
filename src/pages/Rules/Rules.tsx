import classes from './Rules.module.scss';
import { motion } from 'framer-motion';
import Section from '../../components/layout/Section/Section';
import Heading from '../../components/typography/Heading';
import { headingTypes } from '../../types/types';
import { routeTransition, routeVariants } from '../../animations/animations';
import Paragraph from "../../components/typography/Paragraph";
import { GAMENAMES } from "../../constants/constants";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../store/context";
import { useHistory } from "react-router-dom";
import MarkdownPage from '../../components/MarkdownPage/MarkdownPage';

const Rules = () => {
    const history = useHistory();
    const [rules, setRules] = useState<JSX.Element[]>([]);
    const context = useContext(Context);
    useEffect(function(){
        if(context.state.games !== undefined){
            let games = [];
            for(let game in context.state.games){
                let gamename = context.state.games[game].name;
                let gameDisplay = GAMENAMES[gamename];
                let url = new URL("/gamepage", window.location.href);
                url.searchParams.append("gamename", gamename);
                games.push(<Paragraph key={gamename} className={classes.Rules__paragraph}><a href={url.href}>{gameDisplay}</a></Paragraph>);
            }
            setRules(games);
        }
    }, [context, history] );
    return <motion.div key="rules" initial="initial" exit="hidden" animate="visible" transition={routeTransition} variants={routeVariants} className={classes.Rules}>
        <Section className={''}>
            <Heading type={headingTypes.main} className={classes.Rules__heading}>Pravidla</Heading>
            <MarkdownPage pageName="rules" className={classes.Rules__general}></MarkdownPage>
            <Heading className={classes.Rules__heading} type={headingTypes.h2}>Pravidla pro jednotlivé hry naleznete na jejich stránkách</Heading>
            <div className={classes.Rules__list}>
                {rules}
            </div>
        </Section>
    </motion.div>
};

export default Rules;