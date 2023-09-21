import discordLogoImg from '../../../assets/discord-logo.svg';
import twitchLogoImg from '../../../assets/twitch-logo.svg';
import logoImg from '../../../assets/logo.svg';
import mailIconImg from '../../../assets/mail-icon.svg';
import YoutubeLogoImg from '../../../assets/youtube-logo.png';
import documentIcon from '../../../assets/document.png';
import classes from './assets.module.scss';

export const DiscordLogo = () => {
    return <img src={discordLogoImg} className={classes.DiscordLogo__discordLogo} alt="Discord logo"></img>
}

export const TwitchLogo = () => {
    return <img src={twitchLogoImg} className={classes.TwitchLogo__twitchLogo} alt='Twitch logo'></img>
}
export const Logo = () =>{
    return <img src={logoImg} className={classes.Logo__logo} alt="Logo"></img>
}

export const MailIcon = () =>{
    return <img src={mailIconImg} alt='Email'></img>
}

export const YoutubeLogo = () =>{
    return <img className={classes.YoutubeLogo__youtubeLogo} src={YoutubeLogoImg} alt='Youtube logo'></img>
}

export const DocumentIcon = () =>{
    return <img className={classes.DocumentIcon__documentIcon} src={documentIcon} alt='Dokument'></img>
}