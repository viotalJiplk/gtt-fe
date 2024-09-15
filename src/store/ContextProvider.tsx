import { useReducer, useCallback, PropsWithChildren } from 'react';
import {Context/*, defaultContextCreator */} from './context';
import { actionTypes } from './actionTypes';
import React from 'react';
import { School } from '../types/types';

interface stateInterface {
    schools: string[],
    discordId: string,
    userObject: Object,
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
            case actionTypes.SET_USEROBJECT:
                return {...state, userObject: action.data.userObject};
        default:
            return state;
    }
};

const ContextProvider: React.FC<PropsWithChildren> = props => {
    const [state, dispatch] = useReducer(reducer, {schools: [], discordId: "", games: [], userObject: Object()});
    const setSchools = useCallback((schools:any) => {
        dispatch({type: actionTypes.SET_SCHOOLS, data: {schools: schools}})
    }, []);
    const setDiscordId = useCallback((discordId:any) => {
        dispatch({type: actionTypes.SET_DISCORDID, data: {discordId: discordId}})
    }, []);
    const setGames = useCallback((games:any) => {
        dispatch({type: actionTypes.SET_GAMES, data: {games: games}})
    }, []);
    const setUserObject = useCallback((userObject:any) => {
        dispatch({type: actionTypes.SET_USEROBJECT, data: {userObject: userObject}})
    }, []);

    const context = {
        state: {
            schools: state.schools,
            discordId: state.discordId,
            games: state.games,
            userObject: state.userObject
        },
        setSchools: (schools: School[]) => {
            setSchools(schools);
        },
        setDiscordId: (discordId: string) => {
            setDiscordId(discordId);
        },
        setGames: (games: Object[]) => {
            setGames(games);
        },
        setUserObject: (userObject: string) => {
            setUserObject(userObject);
        }
    }
    return <Context.Provider value={context}>{props.children}</Context.Provider>
};

export default ContextProvider;