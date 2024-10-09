import React, { useContext, useState, useEffect } from 'react';
import classes from './GameLogo.module.scss';

import { Context } from '../../../store/context';
import { Game } from "../../../types/types";
import { getGameById } from '../../../utils/utils';

interface GameLogoProps {
    gameId: number,
    game?: Game,
    className?: string,
    onClick?: Function
}

const GameLogo: React.FC<GameLogoProps> = ({game, gameId, className, onClick }) => {
    const [gameLogo, setGameLogo] = useState<JSX.Element>(<img onClick={() => {
        if (onClick !== undefined) {
            onClick(gameId)
        }
    }} className={[className, classes.GameLogo].join(" ")} alt='gameLogo'/>);
    const context = useContext(Context);
    useEffect(() => {
        if (context.state.games !== undefined) {
            let finalGame = game;
            if (finalGame === undefined) {
                finalGame = getGameById(gameId, context.state.games);
            }
            if (finalGame === undefined) {
                console.error(`Game not found for gameId ${gameId}`);
            } else {
                setGameLogo(<img onClick={() => {
                    if (onClick !== undefined) {
                        onClick(gameId)
                    }
                }} className={[className, classes.GameLogo].join(" ")} alt={finalGame.name} src={finalGame.icon}>
                </img>);
            }
        }
    }, [context.state.games, className, game, gameId, onClick]);
    return <div>{gameLogo}</div>
};

export default GameLogo;