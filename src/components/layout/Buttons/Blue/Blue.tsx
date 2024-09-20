import React, { PropsWithChildren } from 'react';
import CTA from "../../CTA/CTA";
import classes from './Blue.module.scss';

interface CTAProps extends PropsWithChildren {
    className?: string,
    onClick?: Function
}

const Blue = (props:CTAProps) => {
    return (
        <CTA onClick={props.onClick} className={[props.className, classes.Blue].join(' ')}>
            {props.children}
        </CTA>
    )
};

export default Blue;