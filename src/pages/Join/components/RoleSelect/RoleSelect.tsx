import { useState, useCallback, useEffect } from "react";
// import classes from './SchoolSelect.module.scss';
import Row from "../../../../components/form/Row/Row";
import Label from "../../../../components/form/Label/Label";
import SelectInput from "../../../../components/form/SelectInput/SelectInput";
import React from 'react';
import { Roles } from "../../../../constants/constants";


interface RoleSelectprops {
    currentRole?: string,
    setFunction?: Function,
    className?: string,
    label?: string
}

const RoleSelect: React.FC<RoleSelectprops> = props => {

    const [curOption, setCurOption] = useState('');
    let [inputValue, setInputValue] = useState('');

    let roles: {value: string, display: string}[] = [];

    if(props.currentRole !== null){
        for (let role in Roles) {
            roles.push({value: role, display: Roles[role]});
        }
        if (inputValue.length > 0 && curOption === '') {
            const regexp = new RegExp(inputValue);
            roles = roles.filter((role) => {
                return role.display.match(regexp);
            });
        }
    }

    useEffect(()=>{
        if((props.currentRole?.length||NaN) < roles.length){
            setInputValue(Roles[props.currentRole||0].display);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.currentRole]);

    const textInputChange = useCallback((value: string) => {
        setCurOption('');
        if (props.setFunction) {
            props.setFunction(null);
        }
        setInputValue(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const curOptionChange = (value:string) => {
        setInputValue(Roles[value]);
        if (props.setFunction) {
            props.setFunction(value);
        };
        setCurOption(value);
    }

    return <Row className={props.className}>
        <Label>{props.label}</Label>
        <div>
            <SelectInput options={roles} value={inputValue} textSetFunction={textInputChange} setFunction={curOptionChange}>

            </SelectInput>
        </div>
    </Row>

    
};

export default RoleSelect;