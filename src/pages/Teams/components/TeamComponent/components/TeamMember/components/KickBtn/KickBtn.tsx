import classes from './KickBtn.module.scss';
import axios from '../../../../../../../../axios/axios';
import ErrorReporter from "../../../../../../../ErrorPage/ErrorReporter";
import RedButton from "../../../../../../../../components/layout/Buttons/Red/Red";

interface KickProps {
    teamId: number,
    userId: string,

}

const KickBtn: React.FC<KickProps> = function(props) {
    return (
        <RedButton className={classes.KickBtn} onClick={async function() {
            await axios.delete("/team/id/"+ String(props.teamId) +"/kick/" + props.userId + "/").catch(function(){
                ErrorReporter("Neaznámá chyba. Zkuste akci opakovat později.");
            });
            window.location.reload();
        }}>Vyhodit</RedButton>
    )
}

export default KickBtn;