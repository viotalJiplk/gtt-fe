import Markdown from "react-markdown";
import { useState } from "react";
import axios from '../../../../axios/axios';
import ErrorReporter from "../../../ErrorPage/ErrorReporter";
import classes from "./MarkdownPage.module.scss";

interface MarkdownPageProps {
    gameId: number,
}

const MarkdownPage: React.FC<MarkdownPageProps> = (props) => {
    const [gamePage, setGamePage] = useState<string>("");
    async function getGamePage(){
        let result = await axios.get("/game/"+ props.gameId +"/page/").catch(function(error){
            ErrorReporter("Server je pravděpodobně offline. Zkuste akci opakovat později.");
        });
        if(result){
            setGamePage(result.data.page);
        }
    }
    if(!Number.isNaN(props.gameId)){
        getGamePage();
    }

    return (
        <Markdown className={classes.MarkdownPage}>{gamePage}</Markdown>
    )
};

export default MarkdownPage;