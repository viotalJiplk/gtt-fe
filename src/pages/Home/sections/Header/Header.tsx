import classes from './Header.module.scss';
import Section from '../../../../components/layout/Section/Section';
import { Logo } from '../../../../components/other/Assets/Assets'
import Heading from '../../../../components/typography/Heading';
import { headingTypes } from '../../../../types/types';
import Paragraph from '../../../../components/typography/Paragraph';
// import CountDown from '../../../../components/other/CountDown/CountDown';
import { useHistory } from "react-router-dom";
import CTA from '../../../../components/layout/CTA/CTA';
import { withRouter } from 'react-router';
import discordLogo from '../../../../assets/discord-logo.svg';
import Sponsors from '../../../../components/other/Sponsors/Sponsors';

import { useEffect, useState, useContext } from 'react';
import { Context } from "../../../../store/context";
import GameLogo from '../../../../components/other/GameLogo/GameLogo';
interface HeaderProps {

}

const Header: React.FC<HeaderProps> = props => {
    const history = useHistory();
    const [gameLogos, setGameLogos] = useState<JSX.Element[] | null>(null);
    const context = useContext(Context);

    useEffect(() => {
        if (context.state.games !== undefined) {
            let tmpGameLogos = [];
            for (let game of context.state.games) {
                tmpGameLogos.push(<GameLogo gameId={game.gameId} game={game} className={classes.Header__gameLogos__logo} onClick={() => {
                    history.push("/gamepage?gamename=" + game.name);
                }}></GameLogo>)
            }
            setGameLogos(tmpGameLogos);
        }
    // eslint-disable-next-line
    }, [context.state.games]);
    return <Section className={classes.Header}>
            <div className={classes.Header__topRight}>
                {/* <CountDown className={classes.Header__countDown}></CountDown> */}
                <div className={classes.Header__topRight}>
                    <Logo></Logo>            
                    <Sponsors className={classes.Header__sponsors}></Sponsors>
                </div>
            </div>
            <div className={classes.Header__content}>
                <Heading className={classes.Header__heading} type={headingTypes.main}>
                    Turnaj v počítačových hrách
                    <br></br>
                    Gymnázia Tišnov
                </Heading>
                <Heading className={classes.Header__subheading} type={headingTypes.h2}>
                    listopad 2024
                </Heading>
                <Paragraph className={classes.Header__paragraph}>
                    Středoškolský turnaj v počítačových hrách.
                </Paragraph>
                <CTA onClick={() => {
                    window.location.href="https://discord.gg/WXtGFxrAdR"
                }} className={classes.Header__connectDiscord}>
                    Spoj se s námi na discordu!
                    <img className={classes.Header__connectDiscord__discordLogo} src={discordLogo} alt="Discord logo"></img>
                </CTA> 
            </div>
            <div className={classes.Header__gameLogos}>
                <Heading className={classes.Header__gamepages} type={headingTypes.h2}>Stránky her:</Heading>
                <div className={classes.Header__gameLogosHolder}>
                    {gameLogos}
                </div>
            </div>  
    </Section>
};

export default withRouter(Header);
