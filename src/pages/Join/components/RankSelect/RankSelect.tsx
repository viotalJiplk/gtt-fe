import { useContext, useState, useCallback, useEffect } from "react";
import { Context } from "../../../../store/context";
// import classes from './SchoolSelect.module.scss';
import Row from "../../../../components/form/Row/Row";
import Label from "../../../../components/form/Label/Label";
import SelectInput from "../../../../components/form/SelectInput/SelectInput";
import React from 'react';
import { Ranks } from "../../../../constants/constants";

// interface Rank{
//     name: string;
//     rankId: number;
// }


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
    let allRanks: {value: number, display: string}[] = [];
    let ranks: {value: number, display: string}[] = [];

    function getRankByRankId(id:number){
        for(let rankIndex in allRanks){
            let rank = allRanks[rankIndex];
            if(rank.value === id){
                return rank;
            }
        }
        return {"display": "", "value": NaN};
    }

    function getGameNameById(id: number) {
        if (context.state.games === undefined) {
            throw new Error("context.state.games must be defined before calling loadEvents");
        }
        for(let x in context.state.games){
            if(context.state.games[x].gameId === id){
                return context.state.games[x].name;
            }
        }
        throw new Error("game does not exist");
    }

    if(context.state.games !== undefined && context.state.games.length > 0 && props.currentGame !== null){
        if(getGameNameById(props.currentGame) !== undefined){
            if(Ranks[getGameNameById(props.currentGame)] !== undefined){
                allRanks = Ranks[getGameNameById(props.currentGame)].map((rank: string, id: number) => {
                    return {
                        value: id, 
                        display: rank
                    }
                })
                if (inputValue.length > 0 && curOption === -1) {
                    ranks = allRanks.filter((rank) => {
                        return rank.display.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase());
                    });
                }else{
                    ranks = allRanks;
                }
            }
        }
    }

    useEffect(()=>{
        if((props.curentRank||NaN) < ranks.length){
            setInputValue(getRankByRankId(props.curentRank||0).display);
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
        setInputValue(getRankByRankId(value).display);
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