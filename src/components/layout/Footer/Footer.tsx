import { Logo, TwitchLogo, DiscordLogo, MailIcon } from '../../other/Assets/Assets';
import classes from './Footer.module.scss';
import MSMTLogo from '../../../assets/msmt_logo.svg';
import JMKLogo from '../../../assets/jmk_logo.svg'
import JRDMLogo from '../../../assets/JRDM_logo.svg';
import HelkorLogo from '../../../assets/helkor_logo.png';
import FakahedaLogo from '../../../assets/fakaheda_logo.png';

interface FooterProps {
    className?: string
}

const Footer: React.FC<FooterProps> = (props) => {
    return <div className={classes.Footer + " " + props.className}>
        <div className={[classes.Footer__section, classes.Footer__section_left].join(' ')}>
            <div className={classes.Footer__logo}><Logo></Logo></div>
        </div>
        <div className={[classes.Footer__section, classes.Footer__sponsorLogos].join(' ')}>
            <div className={classes.Footer__sponsorLogos__column}>
                <img src={JRDMLogo}></img>
                <img src={MSMTLogo}></img>
            </div>
            <div className={classes.Footer__sponsorLogos__column}>
                <img src={JMKLogo}></img>
                <img src={FakahedaLogo}></img>
                <img src={HelkorLogo}></img>
            </div>
        </div>
        <div className={[classes.Footer__section, classes.Footer__section_right].join(' ')}>
            <div className={classes.Footer__mail}>
                <MailIcon></MailIcon>
                <p><a href="mailto:turnajvpocitacovychhrach@gym-tisnov.cz">turnajvpocitacovychhrach@gym-tisnov.cz</a></p>
            </div>
            <div className={classes.Footer__twitch}>
                <div className={classes.Footer__twitchLogo}><TwitchLogo></TwitchLogo></div>
                <div className={classes.Footer__twitchLinks}>
                    <p className={classes.Footer__twitchLink}><a href="https://www.twitch.tv/gttournament_a">https://www.twitch.tv/gttournament_a</a></p>
                    <p className={classes.Footer__twitchLink}><a href="https://www.twitch.tv/gttournament_b">https://www.twitch.tv/gttournament_b</a></p>
                    {/*<p className={classes.Footer__twitchLink}><a href="https://www.twitch.tv/gttournament_c">https://www.twitch.tv/gttournament_c</a></p>
                    <p className={classes.Footer__twitchLink}><a href="https://www.twitch.tv/gttournament_d">https://www.twitch.tv/gttournament_d</a></p>*/}
                </div>
            </div>
            <div className={classes.Footer__discord}>
                <div className={classes.Footer__discordLogo}><DiscordLogo></DiscordLogo></div>
                <p className={classes.Footer__discordLink}>
                    <a href="https://discord.gg/WXtGFxrAdR">https://discord.gg/WXtGFxrAdR</a>
                </p>
            </div>

        </div>

    </div>
};

export default Footer;