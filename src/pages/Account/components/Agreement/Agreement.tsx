import React, { useEffect } from 'react';
// import { GAMETYPES } from '../../../../types/types';
import Label from '../Label/Label';
import { useState, useCallback } from 'react';
import Row from '../Row/Row';
import CheckBoxInput from '../CheckBoxInput/CheckBoxInput';
import classes from './Agreement.module.scss';


interface AgreementProps {
    setFunction: Function
}

const Agreement: React.FC<AgreementProps> = props => {
    const [generalAgreementChecked, setGeneralAgreementChecked] = useState(false);
    // const [GDPRAgreementChecked, setGDPRAgreementChecked] = useState(false);

    // const toggleGDPR = useCallback(() => {
    //     setGDPRAgreementChecked(c => !c);
    // }, []);
    const toggleGeneral = useCallback(() => {
        setGeneralAgreementChecked(c => !c);
    }, [])

    useEffect(() => {
        props.setFunction(generalAgreementChecked);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [generalAgreementChecked])
   
    return <div className={classes.Agreement}>
        {/* <Row className={classes.Agreement__row}>
            <Label className={classes.Agreement__label}>Souhlasím se <a download="agreement" href="/agreement.pdf">zpracováním osobních údajů.</a></Label>
            <CheckBoxInput setFunction={toggleGDPR} checked={GDPRAgreementChecked}></CheckBoxInput>
        </Row> */}
        <Row className={classes.Agreement__row}>
            <Label className={classes.Agreement__label}>Znám <a onClick={(e) => {
                e.preventDefault();
                window.open('/rules')
            }}href="/rules">obecná pravidla turnaje</a> a pravidla jednotlivých her a souhlasím s nimi.</Label>
            <CheckBoxInput setFunction={toggleGeneral} checked={generalAgreementChecked}></CheckBoxInput>
        </Row>
    </div>
};

export default Agreement;