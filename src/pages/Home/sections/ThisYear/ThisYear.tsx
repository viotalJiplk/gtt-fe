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

import { useState } from 'react';

import { motion } from 'framer-motion';


const schedule = [
    {
        date: '17.11.2023',
        description: '',
        events: [
            {
                game: GAMETYPES.VALORANT,
                segments: [
                    { 
                        beginTime: '10:00',
                        endTime: '16:00'
                    }
                ]
            },
            {
                game: GAMETYPES.ROCKET_LEAGUE,
                segments: [
                    { 
                        beginTime: '14:00',
                        endTime: '18:00'
                    }
                ]
            },
        ]   
    },
    {
        date: '18.11.2023',
        description: '',
        events: [
            {
                game: GAMETYPES.LOL,
                segments: [
                    { 
                        beginTime: '10:00',
                        endTime: '18:00'
                    }
                ]
            },
        ]
    },
    {
        date: '19.11.2023',
        description: '',
        events: [
            {
                game: GAMETYPES.COUNTER_STRIKE,
                segments: [
                    { 
                        beginTime: '10:00',
                        endTime: '18:00'
                    }
                ]
            },
            {
                game: GAMETYPES.MINECRAFT,
                segments: [
                    { 
                        beginTime: '13:00',
                        endTime: '18:00'
                    }
                ]
            },
        ]   
    },
    {
        date: '25.11.2023',
        description: '',
        events: [
            {
                game: GAMETYPES.R6,
                segments: [
                    { 
                        beginTime: '10:00',
                        endTime: '15:00'
                    }
                ]
            },
            {
                game: GAMETYPES.VALORANT,
                segments: [
                    { 
                        beginTime: '15:00',
                        endTime: '18:00'
                    }
                ]
            },
        ]   
    },
    {
        date: '26.11.2023',
        description: '',
        events: [
            {
                game: GAMETYPES.ROCKET_LEAGUE,
                segments: [
                    { 
                        beginTime: '10:00',
                        endTime: '11:30'
                    }
                ]
            },
            {
                game: GAMETYPES.LOL,
                segments: [
                    { 
                        beginTime: '12:00',
                        endTime: '14:30'
                    }
                ]
            },
            {
                game: GAMETYPES.COUNTER_STRIKE,
                segments: [
                    { 
                        beginTime: '15:00',
                        endTime: '18:00'
                    }
                ]
            },
        ]   
    },
]


const ThisYear = () => {
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
        let BGclassName = '';
        if (backgroundImages.length > 1) {
            BGclassName = classes.ThisYear__backgroundImage + " " + (id === 0 ? classes.ThisYear__backgroundImage_0 : classes.ThisYear__backgroundImage_1);
        } else {
            BGclassName = classes.ThisYear__backgroundImage;
        }
        return <div key={id} className={classes.ThisYear__imageDiv}><img className={BGclassName} src={imgSrc} alt="pozadí"></img></div>
    });
    const descriptionElements = schedule[currentDay].events.map((event, id) => {
        const times = event.segments.map((segment, id) => { 
            return <div key={id} className={classes.ThisYear__description__time}>    
                <p>{segment.beginTime} - {segment.endTime}</p>
            </div>
        });
        return <div key={id} className={classes.ThisYear__description}>
            <GameLogo key="GameLogo" className={''} game={event.game}></GameLogo>
            <div key="times" className={classes.ThisYear__description__times}>
                {times}
            </div>
        </div>
    });
    return <Section className={classes.ThisYear}>
                <motion.div key={currentDay} initial={{y: '-100%', opacity: 0}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: '100%'}} transition={{duration: 0.5}}className={classes.ThisYear__dynamic}>
                    <div key="background" className={classes.ThisYear__background}>
                        {backgroundElements}
                    </div>
                    <div key="content" className={classes.ThisYear__content}>
                        <Heading key="heading" className={classes.ThisYear__heading} type={headingTypes.h1}>{schedule[currentDay].date}</Heading>
                        <Paragraph key="dayDescription" className={classes.ThisYear__paragraph}>
                            {schedule[currentDay].description}
                        </Paragraph>
                        <div key="descriptionElementHolder" className={classes.ThisYear__descriptions}>
                            {descriptionElements}
                        </div>
                    </div>
                </motion.div>
                <TimeAxis key="timeaxis" schedule={schedule} currentDay={currentDay} setCurrentDay={setCurrentDay} className={classes.ThisYear__timeAxis}></TimeAxis>
            </Section>
};

export default ThisYear;

