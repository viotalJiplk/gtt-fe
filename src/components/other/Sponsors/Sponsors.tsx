import classes from './Sponsors.module.scss';

import HelkorLogo from '../../../assets/helkor_logo.png';
import FakahedaLogo from '../../../assets/fakaheda_logo.png';
import ArtinLogo from '../../../assets/artinlogo.png';
import TepFactor from '../../../assets/tepfactor.png';

interface SponsorProps{
    className?: string
}

export default function Sponsors(props: SponsorProps){
    return <div className={[props.className, classes.Sponsors].join(" ")}>
            <a href="https://www.fakaheda.eu/" rel="noreferrer" target="_blank"><img alt={"Fakaheda Logo"} src={FakahedaLogo}></img></a>
            <a href="https://helkor.eu/" rel="noreferrer" target="_blank"><img alt={"Helkor Logo"} src={HelkorLogo}></img></a>
            <a href="https://artin.eu/" rel="noreferrer" target="_blank"><img alt={"Artin Logo"} src={ArtinLogo}></img></a>
            <a href="https://www.tepfactor.cz/cze/" rel="noreferrer" target="_blank"><img alt={"TEPfactor"} src={TepFactor}></img></a>
    </div>
}