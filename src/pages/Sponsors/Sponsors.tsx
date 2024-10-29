import classes from './Sponsors.module.scss';
import Heading from '../../components/typography/Heading';
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import { ApiError, Sponsor, headingTypes } from '../../types/types';
import { routeTransition, routeVariants } from "../../animations/animations";
import Section from '../../components/layout/Section/Section';
import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../components/other/Spinner/Spinner';

const Sponsors = () => {
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
                tmpSponsors.push(<section>
                    <img alt={value.sponsorName + " Logo"} src={value.logo} className={classes.Sponsors__logo}></img>
                    <Markdown remarkPlugins={[[remarkGfm, {singleTilde: false}]]} className={classes.Sponsors__sponsorsMarkdownText}>{value.sponsorText}</Markdown>
                </section>);
            }
            setSponsorLogos(tmpSponsors);
                
        }
    }
    useEffect(() => {
        loadSponsors();
    }, []);    
    return <motion.div key="sponsors" className={classes.Sponsors} variants={routeVariants} transition={routeTransition} exit="hidden" animate="visible" initial="initial">
        <Section className={''}>
            <Heading className={''} type={headingTypes.main}>Sponzoři</Heading>
            {sponsorLogos}
        </Section>
    </motion.div>
};

export default Sponsors;