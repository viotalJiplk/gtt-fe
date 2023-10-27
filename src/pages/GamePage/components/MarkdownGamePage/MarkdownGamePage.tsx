import Markdown from "react-markdown";
import { useState } from "react";
import axios from '../../../../axios/axios';
import ErrorReporter from "../../../ErrorPage/ErrorReporter";
import classes from "./MarkdownGamePage.module.scss";
import remarkGfm from 'remark-gfm'

interface MarkdownGamePageProps {
    gameId: number,
}

const MarkdownGamePage: React.FC<MarkdownGamePageProps> = (props) => {
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
        <Markdown remarkPlugins={[[remarkGfm, {singleTilde: false}]]} className={classes.MarkdownPage}>{gamePage}</Markdown>
    )
};

export default MarkdownGamePage;