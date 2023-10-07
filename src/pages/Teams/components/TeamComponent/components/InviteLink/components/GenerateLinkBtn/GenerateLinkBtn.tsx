import classes from './GenerateLinkBtn.module.scss';

interface LeaveProps {
    onClick: Function,
}

const GenerateLinkBtn: React.FC<LeaveProps> = function(props) {
    return (
        <button className={classes.GenerateLinkBtn} onClick={function(event){props.onClick(event)}}>Vygenerovat</button>
    )
}

export default GenerateLinkBtn;