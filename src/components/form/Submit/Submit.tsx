import React, { PropsWithChildren } from 'react';
import BlueButton from '../../../components/layout/Buttons/Blue/Blue';
import classes from './Submit.module.scss';

interface SubmitProps extends PropsWithChildren{
    className?: string,
    onClick?: Function,
}

const Submit: React.FC<SubmitProps> = props => {
    return <BlueButton onClick={props.onClick} className={[classes.Submit, props.className].join(' ')}>
        {props.children}
    </BlueButton>
};

export default Submit;