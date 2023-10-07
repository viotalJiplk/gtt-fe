import { useContext, useState, useCallback, useEffect } from "react";
import { Context } from "../../../../store/context";
// import classes from './SchoolSelect.module.scss';
import Row from "../../../../components/form/Row/Row";
import Label from "../../../../components/form/Label/Label";
import SelectInput from "../../../../components/form/SelectInput/SelectInput";
import React from 'react';
import { Ranks } from "../../../../constants/constants";

interface Rank{
    name: string;
    rankId: number;
}


interface GameSelectProps {
    curentRank?: number,
    setFunction?: Function,
    className?: string,
    currentGame: number | null,
    label?: string
}

const RankSelect: React.FC<GameSelectProps> = props => {

    const [curOption, setCurOption] = useState(-1);
    let [inputValue, setInputValue] = useState('');

    const context = useContext(Context);
    let ranks: {value: number, display: string}[] = [];

    function getGameNameById(id:number){
        for(let x in context.state.games){
            if(context.state.games[x].gameId === id){
                return context.state.games[x].name;
            }
        }
        return undefined;
    }

    if(context.state.games !== undefined && props.currentGame !== null){
        if(getGameNameById(props.currentGame) !== undefined){
            if(Ranks[getGameNameById(props.currentGame)] !== undefined){
                ranks = Ranks[getGameNameById(props.currentGame)].map((rank: Rank, id: number) => {
                    return {
                        value: id, 
                        display: rank
                    }
                })
                if (inputValue.length > 0 && curOption === -1) {
                    const regexp = new RegExp(inputValue);
                    ranks = ranks.filter((rank) => {
                        return rank.display.match(regexp);
                    });
                }
            }
        }
    }

    useEffect(()=>{
        if((props.curentRank||NaN) < ranks.length){
            setInputValue(ranks[(props.curentRank||0)].display);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.curentRank]);

    const textInputChange = useCallback((value: string) => {
        setCurOption(-1);
        if (props.setFunction) {
            props.setFunction(null);
        }
        setInputValue(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const curOptionChange = (value:number) => {
        setInputValue(ranks[value].display);
        if (props.setFunction) {
            props.setFunction(value);
        };
        setCurOption(value);
    }

    return <Row className={props.className}>
        <Label>{props.label}</Label>
        <div>
            <SelectInput options={ranks} value={inputValue} textSetFunction={textInputChange} setFunction={curOptionChange}>

            </SelectInput>
        </div>
    </Row>

    
};

export default RankSelect;