import classes from './Winners.module.scss';
import Heading from '../../components/typography/Heading';
import { headingTypes } from '../../types/types';
import { routeTransition, routeVariants } from "../../animations/animations";
import Section from '../../components/layout/Section/Section';
import { motion } from 'framer-motion';

import MarkdownPage from '../../components/MarkdownPage/MarkdownPage';

const Winners = () => {
    return <motion.div key="winners" className={classes.Winners} variants={routeVariants} transition={routeTransition} exit="hidden" animate="visible" initial="initial">
        <Section className={''}>
            <Heading className={''} type={headingTypes.main}>Vítězové</Heading>
            <MarkdownPage pageName='winners' className={classes.Winners__winnersMarkdownPage}></MarkdownPage>
        </Section>
    </motion.div>
};

export default Winners;