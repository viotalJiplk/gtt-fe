import React from 'react';
import { ContextInterface } from "./ContextProvider";

export const defaultContextCreator: any = () => {
    return {
     
    }
}

export const Context: React.Context<ContextInterface> = React.createContext(defaultContextCreator());