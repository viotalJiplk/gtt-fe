import { useReducer, useCallback } from 'react';
import {Context/*, defaultContextCreator */} from './context';
import { actionTypes } from './actionTypes';
import React from 'react';

interface stateInterface {
    schools: string[],
    discordId: string[],
    games: object[],
}

export const reducer = (state: stateInterface, action: {type: actionTypes, data: any}) => {
    switch(action.type) {
        case actionTypes.SET_SCHOOLS:
            return {...state, schools: action.data.schools};
        case actionTypes.SET_DISCORDID:
            return {...state, discordId: action.data.discordId};
        case actionTypes.SET_GAMES:
            return {...state, games: action.data.games};
        default:
            return state;
    }
};

const ContextProvider: React.FC<{}> = props => {
    const [state, dispatch] = useReducer(reducer, {schools: [], discordId: "", games: []});
    const setSchools = useCallback((schools) => {
        dispatch({type: actionTypes.SET_SCHOOLS, data: {schools: schools}})
    }, []);
    const setDiscordId = useCallback((discordId) => {
        dispatch({type: actionTypes.SET_DISCORDID, data: {discordId: discordId}})
    }, []);
    const setGames = useCallback((games) => {
        dispatch({type: actionTypes.SET_GAMES, data: {games: games}})
    }, []);

    const context = {
        state: {
            schools: state.schools,
            discordId: state.discordId,
            games: state.games
        },
        setSchools: (schools: string[]) => {
            setSchools(schools);
        },
        setDiscordId: (discordId: string) => {
            setDiscordId(discordId);
        },
        setGames: (games: Object[]) => {
            setGames(games);
        }
    }
    return <Context.Provider value={context}>{props.children}</Context.Provider>
};

export default ContextProvider;