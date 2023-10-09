import classes from './SelectInput.module.scss';
import TextInput from '../TextInput/TextInput';
import React, { useState } from 'react';

interface SelectInputProps {
    className?: string,
    setFunction?: Function,
    options: {value: any, display: string}[],
    id?: string,
    value?: any,
    textSetFunction?: Function
}

const SelectInput: React.FC<SelectInputProps> = props => {
    const [opened, setOpened] = useState(false);

    const handleComponentAFocus = () => {
        setOpened(true);
      };
    
      const handleComponentABlur = () => {
        // I know this is awfull but I wasn't able to find another way around
        setTimeout(()=>{setOpened(false)}, 500);
      };

    function returnOptions(){
        return props.options.map((option, id) => {
            return <div key={id} onClick={() => {
                if (props.setFunction) {
                    console.log(option.value);
                    props.setFunction(option.value);
                }
            }}className={classes.SelectInput__option}>{option.display}</div>
        });
    }

    return <div onFocus={handleComponentAFocus}
    onBlur={handleComponentABlur}
    id={props.id} className={classes.SelectInput}>
        <TextInput setFunction={props.textSetFunction} value={props.value}></TextInput>
        {opened && <div className={classes.SelectInput__options}>
            {returnOptions()}
        </div>}
    </div>
};

export default SelectInput;