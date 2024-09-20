import classes from './Schools.module.scss';
import Heading from '../../components/typography/Heading';
import { Context } from '../../store/context';
import { useContext, useEffect, useState } from 'react';
import { routeTransition, routeVariants } from '../../animations/animations';
import { motion } from 'framer-motion';
import { headingTypes } from '../../types/types';


interface School{
    name: string;
    schoolId: Number;
}

const Schools = () => {
    const context = useContext(Context);
    const [schoolElements, setSchoolElements] = useState<JSX.Element[]>([]);

    useEffect(() => {
        if (context.state.schools !== undefined) {
            setSchoolElements(context.state.schools.sort((prevSchool: School, thisSchool: School) => {
                return prevSchool.name.localeCompare(thisSchool.name);
            }).map((school: any) => {
                return <li className={classes.Schools__school}>{school.name}</li>
            }));
        }
    }, [context]);
    
    return <motion.div variants={routeVariants} key="schools" transition={routeTransition} exit="hidden" animate="visible" initial="initial" className={classes.Schools}>
        <Heading type={headingTypes.main} className={classes.Schools__heading}>Pozvané Školy</Heading>
        <ul className={classes.Schools__schools}>
            {schoolElements}
        </ul>
    </motion.div>
};

export default Schools;