import classes from './About.module.scss';
import { motion } from 'framer-motion';
import Section from '../../components/layout/Section/Section';
import Heading from '../../components/typography/Heading';
import { headingTypes } from '../../types/types';
import { routeTransition, routeVariants } from '../../animations/animations';
import MarkdownPage from '../../components/MarkdownPage/MarkdownPage';

const About = () => {
    return <motion.div key="about" initial="initial" exit="hidden" animate="visible" transition={routeTransition} variants={routeVariants} className={classes.About}>
        <Section className={''}>
            <Heading type={headingTypes.main} className={classes.About__heading}>O nás</Heading>
            <MarkdownPage pageName="about" className={classes.About__general}></MarkdownPage>
        </Section>
    </motion.div>
};

export default About;