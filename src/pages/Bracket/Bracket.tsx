import { useState } from "react";
import EventSelect from "./components/EventSelect";
import Table from "./components/Table";
import classes from './Bracket.module.scss';

export default function Bracket() {
  const [currentEvent, setCurrentEvent] = useState(null);
  return (
    <div className={classes.Bracket}>
      <EventSelect currentEvent={currentEvent} setFunction={setCurrentEvent} />

      <Table eventId={currentEvent} />
    </div>
  )
}
