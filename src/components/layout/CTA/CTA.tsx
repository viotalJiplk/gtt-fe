import React, { PropsWithChildren } from 'react';
import classes from './CTA.module.scss';

interface CTAProps extends PropsWithChildren {
    className?: string,
    onClick?: Function
}

const CTA: React.FC<CTAProps> = props => {
    return <button onClick={(e) =>{
        if (props.onClick) {
            props.onClick(e);
        }
    }}className={[classes.CTA, props.className].join(' ')}>
        {props.children}
    </button>
};

export default CTA;