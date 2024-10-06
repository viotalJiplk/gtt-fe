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

import MSMTLogo from '../../../../assets/msmt_logo.svg';
import JMKLogo from '../../../../assets/jmk_logo.svg'
import JRDMLogo from '../../../../assets/JRDM_logo.svg';
import HelkorLogo from '../../../../assets/helkor_logo.png';
import FakahedaLogo from '../../../../assets/fakaheda_logo.png';
import ArtinLogo from '../../../../assets/artinlogo.png';
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
    }, [context.state.games]);
    return <Section className={classes.Header}>
            <div className={classes.Header__topRight}>
                {/* <CountDown className={classes.Header__countDown}></CountDown> */}
                <Logo></Logo>
                <div className={classes.Header__sponsorLogos}>
                    <div className={classes.Header__sponsorLogos__column}>
                        <a href="https://jrdm.cz/" rel="noreferrer" target="_blank"><img alt={"JRDM Logo"} src={JRDMLogo}></img></a>
                        <a href="https://www.msmt.cz/" rel="noreferrer" target="_blank"><img alt={"MSMT Logo"} src={MSMTLogo}></img></a>
                    </div>
                    <div className={classes.Header__sponsorLogos__column}>
                        <a href="https://www.jmk.cz/" rel="noreferrer" target="_blank"><img alt={"JMK Logo"} src={JMKLogo}></img></a>
                        <a href="https://www.fakaheda.eu/" rel="noreferrer" target="_blank"><img alt={"Fakaheda Logo"} src={FakahedaLogo}></img></a>
                        <a href="https://helkor.eu/" rel="noreferrer" target="_blank"><img alt={"Helkor Logo"} src={HelkorLogo}></img></a>
                        <a href="https://artin.eu/" rel="noreferrer" target="_blank"><img alt={"Artin Logo"} src={ArtinLogo}></img></a>
                    </div>
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
