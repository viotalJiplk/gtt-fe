import React, { useEffect } from 'react';
// import { GAMETYPES } from '../../../../types/types';
import Label from '../../../../components/form/Label/Label';
import { useState, useCallback } from 'react';
import Row from '../../../../components/form/Row/Row';
import CheckBoxInput from '../../../../components/form/CheckBoxInput/CheckBoxInput';
import classes from './Camera.module.scss';


interface CameraProps {
    setFunction: Function,
    value: boolean
}

const Camera: React.FC<CameraProps> = props => {
    const [generalCameraChecked, setGeneralCameraChecked] = useState(props.value);
    // const [GDPRCameraChecked, setGDPRCameraChecked] = useState(false);

    // const toggleGDPR = useCallback(() => {
    //     setGDPRCameraChecked(c => !c);
    // }, []);
    const toggleGeneral = useCallback(() => {
        setGeneralCameraChecked(c => !c);
    }, [])

    useEffect(() => {
        props.setFunction(generalCameraChecked);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [generalCameraChecked])
   
    return <div className={classes.Camera}>
        {/* <Row className={classes.Camera__row}>
            <Label className={classes.Camera__label}>Souhlasím se <a download="Camera" href="/Camera.pdf">zpracováním osobních údajů.</a></Label>
            <CheckBoxInput setFunction={toggleGDPR} checked={GDPRCameraChecked}></CheckBoxInput>
        </Row> */}
        <Row className={classes.Camera__row}>
            <Label className={classes.Camera__label}>Mám kameru a jsem ochoten vystoupit na streamu. (volitelné)</Label>
            <CheckBoxInput setFunction={toggleGeneral} checked={generalCameraChecked}></CheckBoxInput>
        </Row>
    </div>
};

export default Camera;