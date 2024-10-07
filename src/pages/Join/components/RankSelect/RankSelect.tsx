import { useContext, useState, useCallback, useEffect } from "react";
import { Context } from "../../../../store/context";
// import classes from './SchoolSelect.module.scss';
import Row from "../../../../components/form/Row/Row";
import Label from "../../../../components/form/Label/Label";
import SelectInput from "../../../../components/form/SelectInput/SelectInput";
import React from 'react';
import { Rank } from "../../../../types/types";


interface GameSelectProps {
    curentRank?: number,
    setFunction?: Function,
    className?: string,
    currentGame: number | null,
    label?: string
}

const RankSelect: React.FC<GameSelectProps> = props => {

    const [curOption, setCurOption] = useState(-1);
    const [allRanks, setAllRanks] = useState<{ value: number, display: string }[]>([]);
    const [ranks, setRanks] = useState<{value: number, display: string}[]>([]);;
    let [inputValue, setInputValue] = useState('');

    async function getRanks(gameId: number) {
        let res = await fetch(`/backend/rank/list/${gameId}/`)
        let result: Rank[] = await res.json();
        let tmpRanks: { value: number, display: string }[] = [];
        for (let rank of result) {
            tmpRanks.push({
                value: rank.rankId,
                display: rank.rankName,
            })
        }
        setAllRanks(tmpRanks);
        return tmpRanks;
    }

    useEffect(()=>{
        if((props.currentGame !== null)){
            getRanks(props.currentGame);
        }
    },[props.currentGame]);

    const context = useContext(Context);

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
    useEffect(() => {
        if (context.state.games !== undefined && context.state.games.length > 0 && props.currentGame !== null) {
            if (getGameNameById(props.currentGame) !== undefined) {
                if (getRankByRankId(props.currentGame) !== undefined) {
                    if (inputValue.length > 0 && curOption === -1) {
                        setRanks(allRanks.filter((rank) => {
                            return rank.display.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase());
                        }));
                    } else {
                        setRanks(allRanks);
                    }
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[allRanks, context.state.games, props.currentGame, inputValue, curOption]);

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