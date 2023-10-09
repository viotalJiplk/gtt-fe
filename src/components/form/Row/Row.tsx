import classes from './Row.module.scss';
import React, { PropsWithChildren } from 'react';

interface RowProps extends PropsWithChildren {
    className?: string
}

const Row: React.FC<RowProps> = props => {
    return <div className={[classes.Row, props.className].join(' ')}>
        {props.children}
    </div>
};

export default Row;