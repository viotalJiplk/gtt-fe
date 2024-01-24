import React, { PropsWithChildren } from "react";
import LoadingSpinner from "../Spinner/Spinner";
import classes from "./LoadingPlaceholder.module.scss";

interface LoadingPlaceholderProps extends PropsWithChildren{
    isLoaded: boolean
}


export const LoadingPlaceholder: React.FC<LoadingPlaceholderProps> = props =>{
    return <div className={classes.LoadingPalceholder}>
        {!props.isLoaded &&
            <LoadingSpinner></LoadingSpinner>
        }
        {props.isLoaded &&
            <div>{props.children}</div>
        }
    </div>
}  