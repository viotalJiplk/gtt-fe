import { useContext, useState, useCallback, useEffect } from "react";
import { Context } from "../../../store/context";
import Row from "../../../components/form/Row/Row";
import Label from "../../../components/form/Label/Label";
import SelectInput from "../../../components/form/SelectInput/SelectInput";
import React from 'react';
import { Event } from "../../../types/types";

interface EventSelectProps {
    id?: string,
    setFunction?: Function,
    className?: string,
    currentEvent: number | null,
    label?: string
}

const EventSelect: React.FC<EventSelectProps> = props => {

    const [curOption, setCurOption] = useState(-1);
    let [inputValue, setInputValue] = useState('');

    const context = useContext(Context);
    let events: {value: number, display: string}[] = [];

    function getEventByEventId(id: number) {
        if (context.state.events !== undefined) {
            for (let event of context.state.events) {
                if (event.eventId === id) {
                    return event;
                }
            }
        }
        return {"description": "", "eventId": NaN};
    }

    if (context.state.events) {
        events = context.state.events.sort((prevEvent: Event, thisEvent: Event) => {
            return prevEvent.description.localeCompare(thisEvent.description);
        }).map((event: Event, id: number) => {
            return {
                value: event.eventId, 
                display: event.description
            }
        })
        if (inputValue.length > 0 && curOption === -1) {
            events = events.filter((event) => {
                return event.display.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase());
            });
        }
    }

    useEffect(()=>{
        if (props.currentEvent){
            if((props.currentEvent) < events.length){
                setInputValue(getEventByEventId(props.currentEvent).description);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.currentEvent]);

    const textInputChange = useCallback((value: string) => {
        setCurOption(-1);
        if (props.setFunction) {
            props.setFunction(null);
        }
        setInputValue(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const curOptionChange = (value:number) => {
        let event = getEventByEventId(value);
        setInputValue(event.description);
        if (props.setFunction) {
            props.setFunction(event.eventId);
        };
        setCurOption(event.eventId);
    }

    return <Row className={props.className}>
        <Label>{props.label}</Label>
        <div>
            <SelectInput options={events} value={inputValue} textSetFunction={textInputChange} setFunction={curOptionChange}>

            </SelectInput>
        </div>
    </Row>

    
};

export default EventSelect;
