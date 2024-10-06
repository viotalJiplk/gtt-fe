import Section from "../../../../components/layout/Section/Section";
import classes from './ThisYear.module.scss';
import Heading from "../../../../components/typography/Heading";
import { Game, headingTypes } from "../../../../types/types";
import TimeAxis from "../../../../components/other/TimeAxis/TimeAxis";
import GameLogo from "../../../../components/other/GameLogo/GameLogo";
import { useMediaQuery } from "react-responsive";
import { useContext, useEffect } from "react";
import { Context } from '../../../../store/context';

import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { LoadingPlaceholder } from "../../../../components/other/LoadingPlaceholder/LoadingPlaceholder";
import axios from "axios";
import BackDrop from "../../../../components/other/BackDrop/BackDrop";

interface eventListResponse{
    beginTime: string,
    date: string,
    description: string,
    endTime: string,
    eventId: number,
    gameId: number
}

interface ScheduleSegment{
    description: string,
    beginTime: string,
    endTime: string,
}

interface ScheduleEvent{
    game: Game,
    segments: ScheduleSegment[] 
}

export interface ScheduleDay{
    date: string,
    events: { [key: string]: ScheduleEvent }
}


const ThisYear = () => {
    const context = useContext(Context);
    const [schedule, setSchedule] = useState<{ [key: string]: ScheduleDay }>();
    const [descriptionElements, setDescriptionElements] = useState<JSX.Element[]>();
    const [backgroundElements, setBackgroundElements] = useState<JSX.Element[]>();
    const isMobile = useMediaQuery({query: '(max-width: 900px)'});
    const [loaded, setLoaded] = useState(false);
    const [currentDay, setCurrentDay] = useState("");
    useEffect(function(){
        if(context.state.games !== undefined && context.state.games.length !== 0){
            loadEvents();
        }
    },
    // eslint-disable-next-line
    [context]
    );

    function getGame(gameId: number) {
        if (context.state.games === undefined) {
            throw new Error("context.state.games must be defined before calling getGame");
        }
        for (let game of context.state.games) {
            if (game.gameId === gameId) {
                return game;
            }
        }
        return undefined;
    }

    async function loadEvents() {
        if (context.state.games === undefined) {
            throw new Error("context.state.games must be defined before calling loadEvents");
        } else {
            const list: eventListResponse[] = (await axios("/backend/event/listAll")).data;

            // sort by dates
            const days: { [key: string]: eventListResponse[] } = {};
            list.forEach((eventTime) => {
                if (!(eventTime.date in days)) {
                    days[eventTime.date] = []
                }
                days[eventTime.date].push(eventTime);
            });

            const gameSorted: { [key: string]: ScheduleDay } = {};

            for (let key in days){
                gameSorted[key] = {
                    "date": key,
                    "events": {}
                }
                for (let eventTime of days[key]) {
                    let game = getGame(eventTime.gameId);
                    if (game === undefined) {
                        console.error("Unknown game");
                        continue;
                    }
                    if (!(eventTime.gameId in gameSorted[key].events)) {
                        gameSorted[key].events[String(eventTime.gameId)] = {
                            game: game,
                            segments: []
                        }
                    }
                    gameSorted[key].events[eventTime.gameId].segments.push({
                        "description": eventTime.description,
                        "beginTime": eventTime.beginTime,
                        "endTime": eventTime.endTime,
                    });
                }
            }

            for (let dayIndex in gameSorted) {
                for (let gameIndex in gameSorted[dayIndex].events) {
                    gameSorted[dayIndex].events[gameIndex].segments = gameSorted[dayIndex].events[gameIndex].segments.sort(function (a, b) {
                        let aDate = new Date(a.beginTime);
                        let bDate = new Date(b.beginTime);
                        if (aDate < bDate) {
                            return -1;
                        } else if (aDate > bDate) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                }
            }
            
            setSchedule(gameSorted);
            setCurrentDay(gameSorted[Object.keys(gameSorted)[0]].date);
            setLoaded(true);
        }
    }

    useEffect(function() {
        if(schedule !== undefined){
            let backgroundImages: JSX.Element[]  = [];
            for(let eventIndex in schedule[currentDay].events){
                let event = schedule[currentDay].events[eventIndex]
                backgroundImages.push(<BackDrop gameId={event.game.gameId} game={event.game}></BackDrop>);
            }
            const backgroundElements = backgroundImages.map((img, id) => {
                const count = backgroundImages.length;
                return  <div 
                    key={id}
                    className={classes.ThisYear__imageDiv}
                    style={!isMobile ? {
                        position: 'absolute',
                        transform: `translateX(${id*100/count-10}%)`,
                        clipPath: `polygon(20% 0, calc((100%/${count}) + 20%) 0, calc((100%/${count})) 100%, 0 100%)`,
                        zIndex: -(id + 1)
                    } : {
                        position: 'relative'
                    }}
                    >
                    {img}
                </div>
            });
            setBackgroundElements(backgroundElements);
            let tmpDescriptionElements = [];
            let id = 0
            for ( let eventIndex in schedule[currentDay].events ) {
                const event = schedule[currentDay].events[eventIndex];
                const times = event.segments.map((segment, id) => { 
                    return <div key={id} className={classes.ThisYear__description__time}>    
                        <p>{segment.description} {segment.beginTime} - {segment.endTime}</p>
                    </div>
                });
                const count = backgroundElements.length;
                tmpDescriptionElements.push(
                    <div className={classes.ThisYear__description}
                        key={id}
                        style={!isMobile ? {
                            left: `${id * 100 / count + 8}%`,
                            top: 0
                        } : {
                            left: '5%',
                            top: `${id * 100 / count}%`
                        }}
                    >
                    <GameLogo className={classes.ThisYear__gameLogo} gameId={event.game.gameId} game={event.game}></GameLogo>
                    <div className={classes.ThisYear__description__times}>
                        {times}
                    </div>
                    </div>);
                id++;
            }

            setDescriptionElements(tmpDescriptionElements);
        }
        // eslint-disable-next-line
    }, [schedule, currentDay])
    return <Section className={classes.ThisYear}>
            <LoadingPlaceholder isLoaded={loaded}>
                    {/* @ts-ignore https://stackoverflow.com/questions/71948755/property-children-does-not-exist-on-type*/}
                    <AnimatePresence >
                        <motion.div key={currentDay} initial={{y: '-100%', opacity: 0}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: '100%'}} transition={{duration: 0.5}}className={classes.ThisYear__dynamic}>
                            <div className={classes.ThisYear__background}>
                                {backgroundElements}
                            </div>
                            <div className={classes.ThisYear__content}>
                                <Heading className={classes.ThisYear__heading} type={headingTypes.h1}>{/*schedule[currentDay].date*/}</Heading>
                                <div className={classes.ThisYear__descriptions}>
                                    {descriptionElements}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    {schedule && <TimeAxis schedule={schedule} currentDay={currentDay} setCurrentDay={setCurrentDay} className={classes.ThisYear__timeAxis}></TimeAxis>}
                </LoadingPlaceholder>
            </Section>
};

export default ThisYear;

