import { useReducer, useCallback, PropsWithChildren } from 'react';
import {Context/*, defaultContextCreator */} from './context';
import { actionTypes } from './actionTypes';
import React from 'react';
import { School, Game, DiscordUserObject, Event } from "../types/types";

interface stateInterface {
    schools?: School[],
    discordId?: string,
    userObject?: DiscordUserObject,
    games?: Game[],
    events?: Event[],
}

export interface ContextInterface{
    state: stateInterface,
    setSchools: Function,
    setDiscordId: Function,
    setGames: Function,
    setUserObject: Function,
    setEvents: Function,
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
        case actionTypes.SET_EVENTS:
            return {...state, event: action.data.event};
        default:
            return state;
    }
};

const ContextProvider: React.FC<PropsWithChildren> = props => {
    const [state, dispatch] = useReducer(reducer, {schools: [], discordId: "", games: [], userObject: Object(), events: []});
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
    const setEvents = useCallback((events:any) => {
        dispatch({type: actionTypes.SET_EVENTS, data: {events: events}})
    }, []);

    const context: ContextInterface = {
        state: {
            schools: state.schools,
            discordId: state.discordId,
            games: state.games,
            userObject: state.userObject,
            events: state.events,
        },
        setSchools: (schools: School[]) => {
            setSchools(schools);
        },
        setDiscordId: (discordId: string) => {
            setDiscordId(discordId);
        },
        setGames: (games: Game[]) => {
            setGames(games);
        },
        setUserObject: (userObject: string) => {
            setUserObject(userObject);
        },
        setEvents: (events: Event[]) => {
            setEvents(events);
        }
    }
    return <Context.Provider value={context}>{props.children}</Context.Provider>
};

export default ContextProvider;
