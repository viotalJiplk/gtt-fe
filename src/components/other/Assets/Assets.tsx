import discordLogoImg from '../../../assets/discord-logo.svg';
import twitchLogoImg from '../../../assets/twitch-logo.svg';
//import logoImg from '../../../assets/logo.svg';
import mailIconImg from '../../../assets/mail-icon.svg';
import YoutubeLogoImg from '../../../assets/youtube-logo.png';
import profileIconImg from '../../../assets/profile-icon.svg';
import classes from './Assets.module.scss';

export const DiscordLogo = () => {
    return <img src={discordLogoImg} className={classes.DiscordLogo__discordLogo} alt="Discord logo"></img>
}

export const TwitchLogo = () => {
    return <img src={twitchLogoImg} className={classes.TwitchLogo__twitchLogo} alt='Twitch logo'></img>
}
export const Logo = () =>{
    return <img src="./favicon.svg" className={classes.Logo__logo} alt="Logo"></img>
}

export const MailIcon = () =>{
    return <img src={mailIconImg} alt='Email'></img>
}

export const YoutubeLogo = () =>{
    return <img className={classes.YoutubeLogo__youtubeLogo} src={YoutubeLogoImg} alt='Youtube logo'></img>
}

export const ProfileIcon = () =>{
    return <img className={classes.ProfileIcon__profileIcon} src={profileIconImg} alt='Profile'></img>
}