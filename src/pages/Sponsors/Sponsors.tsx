import classes from './Sponsors.module.scss';
import Heading from '../../components/typography/Heading';
import { headingTypes } from '../../types/types';
import { routeTransition, routeVariants } from "../../animations/animations";
import Section from '../../components/layout/Section/Section';
import SponsorshipPackages from '../../assets/sponzorske-balicky.png';
import { motion } from 'framer-motion';

import SponsorsMarkdownPage from '../../components/MarkdownPage/MarkdownPage';

const Sponsors = () => {
    return <motion.div key="sponsors" className={classes.Sponsors} variants={routeVariants} transition={routeTransition} exit="hidden" animate="visible" initial="initial">
        <Section className={''}>
            <Heading className={''} type={headingTypes.main}>Sponzoři</Heading>
            <SponsorsMarkdownPage pageName='sponsors' className={classes.Sponsors__sponsorsMarkdownPage}></SponsorsMarkdownPage>
            <Heading className={''} type={headingTypes.h1}>Jak se stát sponzorem?</Heading>
            <p className={classes.Sponsors__contact}>Pokud máte zájem stát se sponzorem, kontaktujte nás na <b><a href="mailto:turnajvpocitacovychhrach@gym-tisnov.cz">turnajvpocitacovychhrach@gym-tisnov.cz</a></b>.</p>
            <img className={classes.Sponsors__packages} alt="Sponsorship Packages" src={SponsorshipPackages}></img>
        </Section>
    </motion.div>
};

export default Sponsors;