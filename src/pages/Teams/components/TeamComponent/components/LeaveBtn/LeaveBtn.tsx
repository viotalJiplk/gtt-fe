import classes from './LeaveBtn.module.scss';
import RedButton from "../../../../../../components/layout/Buttons/Red/Red";

interface LeaveProps {
    onClick: Function,
}

const LeaveBtn: React.FC<LeaveProps>=function(props) {
    return (
        <RedButton className={classes.LeaveBtn} onClick={function(event: any){props.onClick(event)}}>Opustit</RedButton>
    )
}

export default LeaveBtn;