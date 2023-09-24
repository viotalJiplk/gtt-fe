import { useContext, useState, useCallback, useEffect } from "react";
import { Context } from "../../../../store/context";
// import classes from './SchoolSelect.module.scss';
import Row from "../Row/Row";
import Label from "../Label/Label";
import SelectInput from "../SelectInput/SelectInput";
import React from 'react';

interface School{
    name: string;
    schoolId: Number;
}

interface SchoolSelectProps {
    id?: string,
    setFunction?: Function,
    className?: string,
    currentSchool: number | null,
    label?: string
}

const SchoolSelect: React.FC<SchoolSelectProps> = props => {

    const [curOption, setCurOption] = useState(-1);
    let [inputValue, setInputValue] = useState('');

    const context = useContext(Context);
    let schools: {value: number, display: string}[] = [];

    if (context.state.schools) {
        schools = context.state.schools.sort((prevSchool: string, thisSchool: string) => {
            if (prevSchool[0] > thisSchool[0]) {
                return 1;
            } else {
                return -1;
            }
        }).map((school: School, id: number) => {
            return {
                value: school.schoolId, 
                display: school.name
            }
        })
        if (inputValue.length > 0 && curOption === -1) {
            const regexp = new RegExp(inputValue);
            schools = schools.filter((school) => {
                return school.display.match(regexp);
            });
        }
    }

    useEffect(()=>{
        if((props.currentSchool||NaN) < schools.length){
            setInputValue(schools[(props.currentSchool||-1)-1].display);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.currentSchool]);

    const textInputChange = useCallback((value: string) => {
        setCurOption(-1);
        if (props.setFunction) {
            props.setFunction(null);
        }
        setInputValue(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const curOptionChange = (value:number) => {
        setInputValue(schools[value - 1].display);
        if (props.setFunction) {
            props.setFunction(value);
        };
        setCurOption(value);
    }

    return <Row className={props.className}>
        <Label>{props.label}</Label>
        <div>
            <SelectInput options={schools} value={inputValue} textSetFunction={textInputChange} setFunction={curOptionChange}>

            </SelectInput>
        </div>
    </Row>

    
};

export default SchoolSelect;