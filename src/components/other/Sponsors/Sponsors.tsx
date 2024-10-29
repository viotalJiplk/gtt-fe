import classes from './Sponsors.module.scss';
import LoadingSpinner from '../Spinner/Spinner';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ApiError, Sponsor } from '../../../types/types';

interface SponsorProps{
    className?: string
}

export default function Sponsors(props: SponsorProps) {
    const [sponsorLogos, setSponsorLogos] = useState<JSX.Element[]>([<LoadingSpinner></LoadingSpinner>]);
    async function loadSponsors() {
        let res = await axios.get<ApiError | Sponsor[]>("/backend/sponsor/all/");
        let data = res.data;
        if (!Array.isArray(data)) {
            console.error(data);
            setSponsorLogos([]);
        } else {
            let tmpSponsors: JSX.Element[] = [];
            for(let value of data){
                tmpSponsors.push(<a href={value.sponsorLink} rel="noreferrer" target="_blank">
                    <img alt={value.sponsorName + " Logo"} src={value.logo}></img></a>);
            }
            setSponsorLogos(tmpSponsors);
                
        }
    }
    useEffect(() => {
        loadSponsors();
    }, []);    
    return <div className={[props.className, classes.Sponsors].join(" ")}>
        {sponsorLogos}
    </div>
}