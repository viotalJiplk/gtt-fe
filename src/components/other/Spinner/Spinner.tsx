import classes from "./Spinner.module.scss";
import Heading from '../../typography/Heading';
import { headingTypes } from '../../../types/types';

export default function LoadingSpinner() {
  return (
    <div className={classes.Spinner}>
      <div className={classes.Spinner__loadingSpinner}>
      </div>
      <Heading className={classes.Spinner__loading} type={headingTypes.main}>Načítání</Heading>
    </div>
  );
}