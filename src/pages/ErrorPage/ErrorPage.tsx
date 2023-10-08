import Heading from '../../components/typography/Heading';
import { headingTypes } from '../../types/types';
import Paragraph from "../../components/typography/Paragraph";
import classes from './ErrorPage.module.scss'
import { motion } from 'framer-motion';
import { routeTransition, routeVariants } from '../../animations/animations';

const ErrorPage = () =>{
    const url = new URL(window.location.href);
    const error = url.searchParams.get("errordescr");
    return <motion.div variants={routeVariants} key="errorPage" transition={routeTransition} exit="hidden" animate="visible" initial="initial" className={classes.ErrorPage}>
        <Heading type={headingTypes.main} className={classes.ErrorPage__heading}>Nastala chyba</Heading>
        <Paragraph className={''}>{error}</Paragraph>
        </motion.div>
}

export default ErrorPage;