import { useContext, useState, useCallback, useEffect } from "react";
import { Context } from "../../../store/context";
// import classes from './SchoolSelect.module.scss';
import Row from "../Row/Row";
import Label from "../Label/Label";
import SelectInput from "../SelectInput/SelectInput";
import React from 'react';
import { GAMENAMES } from "../../../constants/constants";

interface Game{
    name: string;
    registrationStart: string;
    registrationEnd: string;
    maxCaptains: number;
    maxMembers: number;
    maxReservists: number;
    gameId: number;
}

interface GameSelectProps {
    id?: string,
    setFunction?: Function,
    className?: string,
    currentGame: number | null,
    label?: string
}

const GameSelect: React.FC<GameSelectProps> = props => {

    const [curOption, setCurOption] = useState(-1);
    let [inputValue, setInputValue] = useState('');

    const context = useContext(Context);
    let games: {value: number, display: string}[] = [];
    let allGames: {value: number, display: string}[] = [];

    if(context.state.games !== undefined){
        allGames = context.state.games.sort((prevGame: Game, thisGame: Game) => {
            if (prevGame.gameId > thisGame.gameId) {
                return 1;
            } else {
                return -1;
            }
        }).map((game: Game, id: number) => {
            return {
                value: game.gameId, 
                display: GAMENAMES[game.name]
            }
        })
        if (inputValue.length > 0 && curOption === -1) {
            const regexp = new RegExp(inputValue);
            games = allGames.filter((game) => {
                return game.display.match(regexp);
            });
        }else{
            games = allGames;
        }
    }

    useEffect(()=>{
        if((props.currentGame||NaN) < games.length){
            setInputValue(allGames[(props.currentGame||-1)-1].display);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.currentGame]);

    const textInputChange = useCallback((value: string) => {
        setCurOption(-1);
        if (props.setFunction) {
            props.setFunction(null);
        }
        setInputValue(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const curOptionChange = (value:number) => {
        setInputValue(allGames[value - 1].display);
        if (props.setFunction) {
            props.setFunction(value);
        };
        setCurOption(value);
    }

    return <Row className={props.className}>
        <Label>{props.label}</Label>
        <div>
            <SelectInput options={games} value={inputValue} textSetFunction={textInputChange} setFunction={curOptionChange}>

            </SelectInput>
        </div>
    </Row>

    
};

export default GameSelect;