import React, { useContext, useState, useEffect } from 'react';
import classes from './BackDrop.module.scss';

import { Context } from '../../../store/context';
import { Game } from "../../../types/types";

interface BackDropProps {
    gameId: number,
    game?: Game,
    className?: string,
    onClick?: Function
}

const BackDrop: React.FC<BackDropProps> = ({game, gameId, className, onClick }) => {
    const [backDrop, setBackDrop] = useState<JSX.Element>(<img onClick={() => {
        if (onClick !== undefined) {
            onClick(gameId)
        }
    }} className={[className, classes.BackDrop].join(" ")} alt=""/>);
    const context = useContext(Context);
    useEffect(() => {
        if (context.state.games !== undefined) {
            let finalGame = game;
            if (finalGame === undefined) {
                for (let gameObject of context.state.games) {
                    if (gameObject.gameId === gameId) {
                        finalGame = gameObject;
                    }
                }
            }
            if (finalGame === undefined) {
                console.error(`Game not found for gameId ${gameId}`);
            } else {
                setBackDrop(<img onClick={() => {
                    if (onClick !== undefined) {
                        onClick(gameId)
                    }
                }} className={[className, classes.BackDrop].join(" ")} alt={finalGame.name} src={finalGame.backdrop}>
                </img>);
            }
        }
    }, [context.state.games, className, game, gameId, onClick]);
    return <div>{backDrop}</div>
};

export default BackDrop;