import classes from './ContestantsSection.module.scss';
import Section from '../../../../components/layout/Section/Section';
import Heading from '../../../../components/typography/Heading';
import { headingTypes } from '../../../../types/types';
import { useEffect, useState } from 'react';
import axios from '../../../../axios/axios';

const ContestantsSection = () => {

    const [teamsElement, setTeamsElement] = useState<JSX.Element[]>([]);
    useEffect(() => {
        axios.get('/contestants').then(response => {
            let tmpTeamElements: JSX.Element[] = [];
            // @ts-expect-error 
            response.forEach(team => {
                tmpTeamElements.push(<div className={classes.ContestantsSection__team}>
                    <p className={classes.ContestantsSection__team__name}>{team.name}</p>
                </div>);
            });
            setTeamsElement(tmpTeamElements);
        })
    }, []);
    
    return <Section className={classes.ContestantsSection}>
        <Heading className={classes.ContestantsSection__subheading} type={headingTypes.h2}>Účastníci turnaje</Heading>
        {teamsElement}
    </Section>
};

export default ContestantsSection;