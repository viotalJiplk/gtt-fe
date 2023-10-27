import Markdown from "react-markdown";
import { useState } from "react";
import axios from '../../axios/axios';
import ErrorReporter from "../../pages/ErrorPage/ErrorReporter";
import classes from "./MarkdownPage.module.scss";
import remarkGfm from 'remark-gfm'
import LoadingSpinner from "../other/Spinner/Spinner";

interface MarkdownPageProps {
    pageName: string,
    className?: string,
}

const MarkdownPage: React.FC<MarkdownPageProps> = (props) => {
    const [markdownPageContent, setMarkdownPageContent] = useState<string>("");
    const [loaded, setLoaded] = useState<boolean>(false);
    async function getGamePage(){
        let result = await axios.get("/page/" + props.pageName + "/").catch(function(error){
            ErrorReporter("Server je pravděpodobně offline. Zkuste akci opakovat později.");
        });
        if(result){
            setMarkdownPageContent(result.data.value);
            setLoaded(true);
        }
    }
    getGamePage();

    return (
        <div>
            {loaded && <Markdown remarkPlugins={[[remarkGfm, {singleTilde: false}]]} className={[classes.MarkdownPage, props.className].join(' ')}>{markdownPageContent}</Markdown>}
            {!loaded && <LoadingSpinner></LoadingSpinner>}
        </div>
    )
};

export default MarkdownPage;