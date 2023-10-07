import classes from './LeaveBtn.module.scss';

interface LeaveProps {
    onClick: Function,
}

const LeaveBtn: React.FC<LeaveProps>=function(props) {
    return (
        <button className={classes.LeaveBtn} onClick={function(event: any){props.onClick(event)}}>Opustit</button>
    )
}

export default LeaveBtn;