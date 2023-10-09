import React, { PropsWithChildren } from 'react';
import classes from './typography.module.scss';

interface ParagraphProps extends PropsWithChildren {
    className: string
}

const Paragraph: React.FC<ParagraphProps> = props => {
    const className = classes.Paragraph + " " + props.className;
    return <p className={className}>
        {props.children}
    </p>
};

export default Paragraph;