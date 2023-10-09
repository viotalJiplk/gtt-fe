import classes from './Section.module.scss';
import React, { PropsWithChildren } from 'react';

interface SectionProps extends PropsWithChildren {
    className: string
}



const Section: React.FC<SectionProps> = props => {
    const className = classes.Section + " " + props.className;
    return <section className={className}>
        {props.children}
    </section>
};

export default Section;

