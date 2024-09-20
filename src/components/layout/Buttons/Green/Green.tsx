import React, { PropsWithChildren } from 'react';
import CTA from "../../CTA/CTA";
import classes from './Green.module.scss';

interface CTAProps extends PropsWithChildren {
    className?: string,
    onClick?: Function
}

const Blue = (props:CTAProps) => {
    return (
        <CTA onClick={props.onClick} className={[props.className, classes.Green].join(' ')}>
            {props.children}
        </CTA>
    )
};

export default Blue;