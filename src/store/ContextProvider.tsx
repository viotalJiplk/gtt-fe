import { useReducer, useCallback, PropsWithChildren } from 'react';
import {Context/*, defaultContextCreator */} from './context';
import { actionTypes } from './actionTypes';
import React from 'react';

interface stateInterface {
    schools: string[],
    discordId: string,
    avatar: string,
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
            case actionTypes.SET_AVATAR:
                return {...state, avatar: action.data.avatar};
        default:
            return state;
    }
};

const ContextProvider: React.FC<PropsWithChildren> = props => {
    const [state, dispatch] = useReducer(reducer, {schools: [], discordId: "", games: [], avatar: ""});
    const setSchools = useCallback((schools:any) => {
        dispatch({type: actionTypes.SET_SCHOOLS, data: {schools: schools}})
    }, []);
    const setDiscordId = useCallback((discordId:any) => {
        dispatch({type: actionTypes.SET_DISCORDID, data: {discordId: discordId}})
    }, []);
    const setGames = useCallback((games:any) => {
        dispatch({type: actionTypes.SET_GAMES, data: {games: games}})
    }, []);
    const setAvatar = useCallback((avatar:any) => {
        dispatch({type: actionTypes.SET_AVATAR, data: {avatar: avatar}})
    }, []);

    const context = {
        state: {
            schools: state.schools,
            discordId: state.discordId,
            games: state.games,
            avatar: state.avatar
        },
        setSchools: (schools: string[]) => {
            setSchools(schools);
        },
        setDiscordId: (discordId: string) => {
            setDiscordId(discordId);
        },
        setGames: (games: Object[]) => {
            setGames(games);
        },
        setAvatar: (avatar: string) => {
            setAvatar(avatar);
        }
    }
    return <Context.Provider value={context}>{props.children}</Context.Provider>
};

export default ContextProvider;