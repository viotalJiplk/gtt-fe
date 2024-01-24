import Section from "../../../../components/layout/Section/Section";
import classes from './ThisYear.module.scss';
import Heading from "../../../../components/typography/Heading";
import Paragraph from "../../../../components/typography/Paragraph";
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

import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

const schedule = [
    {
        date: '17.11.2023',
        events: [
            {
                game: GAMETYPES.VALORANT,
                segments: [
                    {
                        description: 'Skupiny',
                        beginTime: '10:00',
                        endTime: '16:00'
                    },
                    { 
                        description: 'Finále',
                        beginTime: '18:00',
                        endTime: '22:00'
                    }
                ]
            },
            {
                game: GAMETYPES.ROCKET_LEAGUE,
                segments: [
                    {
                        description: '',
                        beginTime: '14:00',
                        endTime: '18:00'
                    }
                ]
            },
        ]   
    },
    {
        date: '18.11.2023',
        events: [
            {
                game: GAMETYPES.LOL,
                segments: [
                    { 
                        description: '',
                        beginTime: '10:00',
                        endTime: '18:00'
                    }
                ]
            },
        ]
    },
    {
        date: '19.11.2023',
        events: [
            {
                game: GAMETYPES.COUNTER_STRIKE,
                segments: [
                    {
                        description: '', 
                        beginTime: '10:00',
                        endTime: '18:00'
                    }
                ]
            },
            {
                game: GAMETYPES.MINECRAFT,
                segments: [
                    { 
                        description: '',
                        beginTime: '13:00',
                        endTime: '18:00'
                    }
                ]
            },
        ]   
    },
    {
        date: '25.11.2023',
        events: [
            {
                game: GAMETYPES.R6,
                segments: [
                    {  
                        description: '',
                        beginTime: '10:00',
                        endTime: '15:00'
                    }
                ]
            },
            {
                game: GAMETYPES.VALORANT,
                segments: [
                    { 
                        description: '',
                        beginTime: '15:00',
                        endTime: '18:00'
                    }
                ]
            },
        ]   
    },
    {
        date: '26.11.2023',
        events: [
            {
                game: GAMETYPES.ROCKET_LEAGUE,
                segments: [
                    {
                        description: '', 
                        beginTime: '10:00',
                        endTime: '11:30'
                    }
                ]
            },
            {
                game: GAMETYPES.LOL,
                segments: [
                    {
                        description: '',
                        beginTime: '12:00',
                        endTime: '14:30'
                    }
                ]
            },
            {
                game: GAMETYPES.COUNTER_STRIKE,
                segments: [
                    { 
                        description: '',
                        beginTime: '15:00',
                        endTime: '18:00'
                    }
                ]
            },
        ]   
    },
]



const ThisYear = () => {
    const isMobile = useMediaQuery({query: '(max-width: 900px)'});
    const [currentDay, setCurrentDay] = useState(0);
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
    const descriptionElements = schedule[currentDay].events.map((event, id) => {
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
            <GameLogo className={''} game={event.game}></GameLogo>
            <div className={classes.ThisYear__description__times}>
                {times}
            </div>
        </div>
    });
    return <Section className={classes.ThisYear}>
                {/* @ts-ignore https://stackoverflow.com/questions/71948755/property-children-does-not-exist-on-type*/}
                <AnimatePresence >
                    <motion.div key={currentDay} initial={{y: '-100%', opacity: 0}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: '100%'}} transition={{duration: 0.5}}className={classes.ThisYear__dynamic}>
                        <div className={classes.ThisYear__background}>
                            {backgroundElements}
                        </div>
                        <div className={classes.ThisYear__content}>
                            <Heading className={classes.ThisYear__heading} type={headingTypes.h1}>{schedule[currentDay].date}</Heading>
                            <div className={classes.ThisYear__descriptions}>
                                {descriptionElements}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
                <TimeAxis schedule={schedule} currentDay={currentDay} setCurrentDay={setCurrentDay} className={classes.ThisYear__timeAxis}></TimeAxis>
            </Section>
};

export default ThisYear;

