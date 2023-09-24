import { useReducer, useCallback } from 'react';
import {Context/*, defaultContextCreator */} from './context';
import { actionTypes } from './actionTypes';
import React from 'react';

interface stateInterface {
    schools: string[],
    discordId: string[]
}

export const reducer = (state: stateInterface, action: {type: actionTypes, data: any}) => {
    switch(action.type) {
        case actionTypes.SET_SCHOOLS:
            return {...state, schools: action.data.schools};
        case actionTypes.SET_DISCORDID:
            return {...state, discordId: action.data.discordId};
        default:
            return state;
    }
};

const ContextProvider: React.FC<{}> = props => {
    const [state, dispatch] = useReducer(reducer, {schools: [], discordId: ""});
    const setSchools = useCallback((schools) => {
        dispatch({type: actionTypes.SET_SCHOOLS, data: {schools: schools}})
    }, []);
    const setDiscordId = useCallback((discordId) => {
        dispatch({type: actionTypes.SET_DISCORDID, data: {discordId: discordId}})
    }, []);

    const context = {
        state: {
            schools: state.schools,
            discordId: state.discordId
        },
        setSchools: (schools: string[]) => {
            setSchools(schools);
        },
        setDiscordId: (discordId: string) => {
            setDiscordId(discordId);
        }
    }
    return <Context.Provider value={context}>{props.children}</Context.Provider>
};

export default ContextProvider;