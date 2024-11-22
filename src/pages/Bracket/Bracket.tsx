import { useState } from "react";
import EventSelect from "./components/EventSelect";
import Table from "./components/Table";

export default function Bracket() {
  const [currentEvent, setCurrentEvent] = useState(null);
  return (
    <div>
      <EventSelect currentEvent={currentEvent} setFunction={setCurrentEvent} />

      <Table eventId={currentEvent} />
    </div>
  )
}
