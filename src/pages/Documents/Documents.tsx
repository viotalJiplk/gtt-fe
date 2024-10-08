import classes from './Documents.module.scss';
import Heading from '../../components/typography/Heading';
import { headingTypes } from '../../types/types';
import { routeTransition, routeVariants } from '../../animations/animations';
import Section from '../../components/layout/Section/Section';
import { motion } from 'framer-motion';

import MarkdownPage from '../../components/MarkdownPage/MarkdownPage';

const Documents = () => {
    return <motion.div key="document" className={classes.Document} variants={routeVariants} transition={routeTransition} exit="hidden" animate="visible" initial="initial">
        <Section className={classes.Document__section}>
            <Heading className={classes.Document__heading} type={headingTypes.main}>Dokumenty</Heading>
            <MarkdownPage pageName='document' className={classes.Document__documentMarkdownPage}></MarkdownPage>
        </Section>
    </motion.div>
};

export default Documents;