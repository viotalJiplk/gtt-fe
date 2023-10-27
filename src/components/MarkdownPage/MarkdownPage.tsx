import Markdown from "react-markdown";
import { useState } from "react";
import axios from '../../axios/axios';
import ErrorReporter from "../../pages/ErrorPage/ErrorReporter";
import classes from "./MarkdownPage.module.scss";
import remarkGfm from 'remark-gfm'

interface MarkdownPageProps {
    pageName: string,
    className?: string,
}

const SponsorsMarkdownPage: React.FC<MarkdownPageProps> = (props) => {
    const [sponsorPage, setSponsoPage] = useState<string>("");
    async function getGamePage(){
        let result = await axios.get("/page/" + props.pageName + "/").catch(function(error){
            ErrorReporter("Server je pravděpodobně offline. Zkuste akci opakovat později.");
        });
        if(result){
            setSponsoPage(result.data.value);
        }
    }
    getGamePage();

    return (
        <Markdown remarkPlugins={[[remarkGfm, {singleTilde: false}]]} className={[classes.MarkdownPage, props.className].join(' ')}>{sponsorPage}</Markdown>
    )
};

export default SponsorsMarkdownPage;