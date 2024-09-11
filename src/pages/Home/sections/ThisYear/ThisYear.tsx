import Section from "../../../../components/layout/Section/Section";
import classes from './ThisYear.module.scss';
import Heading from "../../../../components/typography/Heading";
import { headingTypes } from "../../../../types/types";
import TimeAxis from "../../../../components/other/TimeAxis/TimeAxis";
import { GAMETYPES } from "../../../../types/types";
import GameLogo from "../../../../components/other/GameLogo/GameLogo";
import rocketImage from '../../../../assets/rocket-wallpaper.webp';
import lolImage from '../../../../assets/lol-wallpaper.jpg';
import minecraftImage from '../../../../assets/minecraft-wallpaper.webp';
import valorantImage from '../../../../assets/valorant-wallpaper.webp';
import counterImage from '../../../../assets/counter-wallpaper.jpeg';
import r6Image from '../../../../assets/r6-wallpaper.jpeg'
import { useMediaQuery } from "react-responsive";
import { useContext, useEffect } from "react";
import { Context } from '../../../../store/context';

import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { LoadingPlaceholder } from "../../../../components/other/LoadingPlaceholder/LoadingPlaceholder";
import axios from "axios";

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
    game: GAMETYPES,
    segments: ScheduleSegment[]
}

interface ScheduleDay{
    date: string,
    events: ScheduleEvent[]
}



const ThisYear = () => {
    const context = useContext(Context);
    const [schedule, setSchedule] = useState<ScheduleDay[]>();
    const [descriptionElements, setDescriptionElements] = useState<JSX.Element[]>();
    const [backgroundElements, setBackgroundElements] = useState<JSX.Element[]>();
    const isMobile = useMediaQuery({query: '(max-width: 900px)'});
    const [loaded, setLoaded] = useState(false);
    const [currentDay, setCurrentDay] = useState(0);
    useEffect(function(){
        if(context.state.games.length !== 0){
            loadEvents();
        }
    },
    // eslint-disable-next-line
    [context]
    );

    async function loadEvents(){
        const list: eventListResponse[] = (await axios("/backend/event/listAll")).data;
        const sorted = list.sort(function(a, b){
            let aDate = new Date(a.date);
            let bDate = new Date(b.date);
            if(aDate < bDate){
                return -1;
            }else if(aDate > bDate){
                return 1;
            }else{
                return 0;
            }
        });
        let tmpSchedule: ScheduleDay[] = [];
        sorted.forEach((day, i)=>{
            day.date = String(Number(day.date.split("-")[2])) + "." + String(Number(day.date.split("-")[1])) + "." + String(Number(day.date.split("-")[0]));
            if((tmpSchedule.length === 0) || (tmpSchedule[tmpSchedule.length-1].date !== day.date)){
                tmpSchedule.push({
                    "date": day.date,
                    "events": []
                });
            }

            let gameName;
            let j = 0;
            while(j < context.state.games.length){
                if(context.state.games[j].gameId === day.gameId){
                    gameName = context.state.games[j].name;
                    break;
                }
                j++;
            }

            if((tmpSchedule[tmpSchedule.length-1].events.length === 0) || (tmpSchedule[tmpSchedule.length-1].events[0].game !== gameName)){
                tmpSchedule[tmpSchedule.length-1].events.push({
                    "game": gameName,
                    "segments": []
                });
            }
            tmpSchedule[tmpSchedule.length-1].events[tmpSchedule[tmpSchedule.length-1].events.length-1].segments.push({
                "beginTime": day.beginTime,
                "endTime": day.endTime,
                "description": day.description,
            });
        });
        setSchedule(tmpSchedule);
        setLoaded(true);
    }

    useEffect(function() {
        if(schedule !== undefined){
            let backgroundImages: string[]  = [];
            schedule[currentDay].events.forEach((event) => {
                if (event.game === GAMETYPES.COUNTER_STRIKE) {
                    backgroundImages.push(counterImage);
                } else if (event.game === GAMETYPES.MINECRAFT) {
                    backgroundImages.push(minecraftImage);
                } else if (event.game === GAMETYPES.LOL) {
                    backgroundImages.push(lolImage);
                } else if (event.game === GAMETYPES.ROCKET_LEAGUE) {
                    backgroundImages.push(rocketImage);
                } else if (event.game === GAMETYPES.VALORANT) {
                    backgroundImages.push(valorantImage);
                } else if (event.game === GAMETYPES.R6) {
                    backgroundImages.push(r6Image);
                }
            })
            const backgroundElements = backgroundImages.map((imgSrc, id) => {
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
                    <img 
                        alt={"Game Background"}
                        className={classes.ThisYear__backgroundImage}
                        src={imgSrc}>
                    </img>
                </div>
            });
            setBackgroundElements(backgroundElements);
            setDescriptionElements(schedule[currentDay].events.map((event, id) => {
                const times = event.segments.map((segment, id) => { 
                    return <div key={id} className={classes.ThisYear__description__time}>    
                        <p>{segment.description} {segment.beginTime} - {segment.endTime}</p>
                    </div>
                });
                const count = backgroundElements.length;
                return <div className={classes.ThisYear__description}
                        key={id}
                        style={!isMobile ? {
                            left: `${id*100/count+8}%`,
                            top: 0
                        } : {
                            left: '5%',
                            top: `${id*100/count}%`
                        }}
                    >
                    <GameLogo className={''} game={GAMETYPES[event.game]}></GameLogo>
                    <div className={classes.ThisYear__description__times}>
                        {times}
                    </div>
                </div>
            }));
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

