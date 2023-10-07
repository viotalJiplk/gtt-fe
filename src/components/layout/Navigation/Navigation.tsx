import classes from './Navigation.module.scss';
import { YoutubeLogo, TwitchLogo } from "../../other/Assets/Assets";
import { NavLink } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence} from 'framer-motion';
import Login from "../../other/Login/Login";
import React from 'react';
import { Context } from '../../../store/context';

interface NavigationProps {
    className?: string
}

const Navigation: React.FC<NavigationProps> = props => {
    const isMobile = useMediaQuery({query: '(max-width: 900px)'});
    const className = classes.Navigation + " " + props.className;
    const context = useContext(Context);
    const hideMobileNavigation = useCallback(() => {
        setIsMobileNavigationShown(false);
        document.removeEventListener('click', hideMobileNavigation);
    }, [])
    
    const toggleMobileNavigation = useCallback(() => {
        if (!isMobile) {
            return;
        }
        setIsMobileNavigationShown(true);
    }, [isMobile]);
    const [isMobileNavigationShown, setIsMobileNavigationShown] = useState(false);
    useEffect(() => {
        setIsMobileNavigationShown(false);
    }, [isMobile])
    useEffect(() => {
        if (isMobileNavigationShown) {
            document.addEventListener('click', hideMobileNavigation);
        }
    }, [isMobileNavigationShown, hideMobileNavigation])
   
    const displayItems = !isMobile || isMobileNavigationShown;
    return <nav className={[className, isMobile? classes.mobile : ''].join(' ')}>
        <AnimatePresence>
            {displayItems && <motion.ul key="navigation" initial={{x: '100%'}} animate={{x: 0}} exit={{x: '100%'}} className={[classes.Navigation__list, isMobile ? classes.mobile : '', isMobileNavigationShown ? classes.active : ''].join(' ')}>
                <li className={classes.Navigation__item}>
                    <NavLink exact activeClassName={classes.active} className={classes.Navigation__link} to="/">Domů</NavLink>
                </li>
                {context.state.discordId !== "notLoggedIn" && context.state.discordId !== "" && <li className={[classes.Navigation__item, classes.Navigation__item_teams].join(' ')}>
                    <NavLink activeClassName={classes.active} className={[classes.Navigation__link, classes.Navigation__link_registration].join(' ')} to="/teams">Moje týmy</NavLink>
                </li>}
                {/*
                <li className={classes.Navigation__item}>
                    <NavLink activeClassName={classes.active} className={classes.Navigation__link} to="/contestants">Účastníci</NavLink>
                </li> */}
                <li className={classes.Navigation__item}>
                    <NavLink activeClassName={classes.active} className={classes.Navigation__link} to="/sponsors">Sponzoři</NavLink>
                </li>
                <li className={classes.Navigation__item}>
                    <NavLink activeClassName={classes.active} className={classes.Navigation__link} to="/rules">Pravidla</NavLink>
                </li>
                <li className={classes.Navigation__item}>
                    <NavLink activeClassName={classes.active} className={classes.Navigation__link} to="/documents">Dokumenty</NavLink>
                </li>
                <li className={classes.Navigation__item} onClick={() => {window.open("https://www.youtube.com/@gttournament/videos")}}>
                    <div className={classes.Navigation__youtubeLogo}><YoutubeLogo></YoutubeLogo></div>
                </li>
                <li className={classes.Navigation__item} onClick={() => {window.open("https://www.twitch.tv/gttournament_a")}}>
                    <div className={classes.Navigation__twitchLogo}><TwitchLogo></TwitchLogo></div>
                </li>
                <li className={classes.Navigation__item}>
                    <div className={classes.Navigation__login}><Login></Login></div>
                </li>
            </motion.ul>}
        </AnimatePresence>
        {isMobile && <div onClick={() => {
            toggleMobileNavigation();
        }}className={classes.Navigation__hamburger}>
            <div className={classes.Navigation__hamburger__line}></div>
            <div className={classes.Navigation__hamburger__line}></div>
            <div className={classes.Navigation__hamburger__line}></div>
        </div>}
    </nav>
};

export default Navigation;