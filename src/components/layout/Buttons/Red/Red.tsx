import React, { PropsWithChildren } from 'react';
import CTA from "../../CTA/CTA";
import classes from './Red.module.scss';

interface CTAProps extends PropsWithChildren {
    className?: string,
    onClick?: Function
}

const Red = (props:CTAProps) => {
    return (
        <CTA onClick={props.onClick} className={[props.className, classes.Red].join(' ')}>
            {props.children}
        </CTA>
    )
};

export default Red;