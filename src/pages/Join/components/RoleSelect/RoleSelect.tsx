import { useState, useCallback, useEffect } from "react";
import axios from '../../../../axios/axios';
import { AxiosResponse } from 'axios';
// import classes from './SchoolSelect.module.scss';
import Row from "../../../../components/form/Row/Row";
import Label from "../../../../components/form/Label/Label";
import SelectInput from "../../../../components/form/SelectInput/SelectInput";
import React from 'react';
import { Roles } from "../../../../constants/constants";
import { Error, GeneratedRole } from "../../../../types/types";
import ErrorReporter from "../../../ErrorPage/ErrorReporter";

interface RoleSelectprops {
    currentRole?: number,
    setFunction?: Function,
    className?: string,
    label?: string,
    currentGame: number | null,
}
interface RolesInterface {
    value: any,
    display: string
}

const RoleSelect: React.FC<RoleSelectprops> = props => {

    const [curOption, setCurOption] = useState('');
    let [inputValue, setInputValue] = useState('');
    const [roles, setRoles] = useState<RolesInterface[]>([]);
    
    async function listRoles(gameId: number) {
        const roleList: AxiosResponse<GeneratedRole[] | Error> = await axios(`/generatedRole/list/` + props.currentGame +`/`).catch(function(error){
            ErrorReporter("Nebylo možné vypsat role. Zkuste akci opakovat později.");
        });
        if ("kind" in roleList.data) {
            console.error(roleList.data);
            ErrorReporter("Nebylo možné vypsat role. Zkuste akci opakovat později.");
        }
        return roleList.data;
    }
    async function loadRoles(gameId: number) {
        const rolesList = await listRoles(gameId);
        let tmpRoles: RolesInterface[] = [];
        for (let role of rolesList) {
            tmpRoles.push({
                "value": role.generatedRoleId,
                "display": role.roleName
            });
        }
        setRoles(tmpRoles);
    }

    function getRoleById(generatedRoleId: number) {
        let role = roles.find((role) => {
            return role.value === generatedRoleId;
        });
        if (role === undefined) {
            ErrorReporter("Role neexistuje. Zkuste akci opakovat později.");
        }
        return role;
    }

    useEffect(()=>{
        if(props.currentGame !== null){
            loadRoles(props.currentGame);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.currentGame]);

    useEffect(() => {
        if (props.currentRole !== undefined) {
            setInputValue(getRoleById(props.currentRole).display);
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