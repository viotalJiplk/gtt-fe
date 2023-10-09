import { useContext, useState, useCallback, useEffect } from "react";
import { Context } from "../../../../store/context";
// import classes from './SchoolSelect.module.scss';
import Row from "../../../../components/form/Row/Row";
import Label from "../../../../components/form/Label/Label";
import SelectInput from "../../../../components/form/SelectInput/SelectInput";
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

    function getSchoolBySchoolId(id:number){
        for(let school in context.state.schools){
            school = context.state.schools[school];
            // @ts-expect-error
            if(school.schoolId === id){
                return school;
            }
        }
        return {"name": "", "id": NaN};
    }

    if (context.state.schools) {
        schools = context.state.schools.sort((prevSchool: School, thisSchool: School) => {
            return prevSchool.name.localeCompare(thisSchool.name);
        }).map((school: School, id: number) => {
            return {
                value: school.schoolId, 
                display: school.name
            }
        })
        if (inputValue.length > 0 && curOption === -1) {
            schools = schools.filter((school) => {
                return school.display.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase());
            });
        }
    }

    useEffect(()=>{
        if (props.currentSchool){
            if((props.currentSchool) < schools.length){
                // @ts-expect-error
                setInputValue(getSchoolBySchoolId(props.currentSchool).name);
            }
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
        let school = getSchoolBySchoolId(value);
        // @ts-expect-error
        setInputValue(school.name);
        if (props.setFunction) {
            // @ts-expect-error
            props.setFunction(school.schoolId);
        };
        // @ts-expect-error
        setCurOption(school.schoolId);
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