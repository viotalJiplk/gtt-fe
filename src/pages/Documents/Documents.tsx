import classes from './Documents.module.scss';
import { DocumentIcon } from "../../components/other/assets/assets";
import Heading from '../../components/typography/Heading';
import { headingTypes } from '../../types/types';
import { routeTransition, routeVariants } from '../../animations/animations';
import Section from '../../components/layout/Section/Section';
import { motion } from 'framer-motion';

const Documents = () => {
    const documentList = [/*{name: 'Zpracování osobních údajů', link: '/agreement.pdf'}*/{name: 'Souhlas rodičů s účastí na turnaji', link: '/parent_agreement.pdf'}]
    const documentElements = documentList.map((document) => {
        return <a href={document.link}><div className={classes.Documents__document}>
            <div>
                <div className={classes.Documents__image}><DocumentIcon></DocumentIcon></div>
            </div>
            <div className={classes.Documents__name}>
                {document.name}
            </div>
        </div></a>
    })
    return <motion.div className={classes.Documents} variants={routeVariants} transition={routeTransition} exit="hidden" animate="visible" initial="initial">
        <Section className={''}>
            <Heading className={classes.Documents__heading} type={headingTypes.main}>Dokumenty</Heading>
            <ul className={classes.Documents__list}>
                {documentElements}
            </ul>
        </Section>
    </motion.div>
};

export default Documents;