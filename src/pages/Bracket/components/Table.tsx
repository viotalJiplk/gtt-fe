import axios from '../../../axios/axios';
import { useEffect, useState } from 'react';
import classes from './Table.module.scss';

type TableProps = {
  eventId: number | null
}

export default function Table(props: TableProps) {
  const [bracket, setBracket] = useState<JSX.Element>(<></>);

  useEffect(() => {
    if (props.eventId === 0 || props.eventId === null) {
      return;
    }

    renderBracket();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.eventId])

  return bracket;

  async function renderBracket() {
    let eventType = "";
    let gameId = 0;
    
    await axios(`/event/${props.eventId}/`)
    .then(response => {
      const event = response.data;
      eventType = event.eventType;
      gameId = event.gameId;
    })
  
    const namesMap = await getTeamNames(gameId);
  
    if (eventType.startsWith("playoff")) {
      axios(`/event/${props.eventId}/matches/`)
      .then(async response => {
        const matches: Match[] = response.data;
        setBracket(await universalTable(namesMap, matches, false, true, 0))
      });
    } else if (eventType.startsWith("swiss")) {
      axios(`/event/${props.eventId}/matches/`)
      .then(async response => {
        const matches: Match[] = response.data;
        setBracket(await universalTable(namesMap, matches, true, false, 3))
      });
    } else if (eventType.startsWith("groups")) {
      const tables: JSX.Element[] = [];

      await axios(`/event/${props.eventId}/stages/`)
      .then(async response => {
        const stages = response.data;
        if (stages.length === 0) {
          tables.push(<p>No matches</p>);
          return;
        }
        const groupLetters = [];
        const stagesByGroup: Map<string, number[]> = new Map();
        for (let stage of stages) {
          const regex = String(stage.stageName).match(/[A-Z]+ - \d+/);
          const groupLetter: string = regex !== null? regex[0].toString().substring(0, regex[0].toString().indexOf(" - ")) : "error";
          if (!stagesByGroup.has(groupLetter)) {
            groupLetters.push(groupLetter);
          }
          const tempGroupStages = stagesByGroup.get(groupLetter)?? [];
          tempGroupStages.push(stage.stageId);
          stagesByGroup.set(groupLetter, tempGroupStages);
        }

        for (let groupIndex = 0; groupIndex < groupLetters.length; groupIndex++) {
          const group = groupLetters[groupIndex];

          const matches: Match[] = [];
          const stages = stagesByGroup.get(group)?? [];

          const promises = [];
          for (let stage of stages) {
            promises.push(axios(`/stage/${stage}/matches/`)
            .then(response => {
              const data = response.data;
              for (let match of data) {
                matches.push(match);
              }
            }))
          }
          await Promise.allSettled(promises);

          tables.push(<div style={{display: "flex", flexDirection: "column"}}><p>Group {group}</p>{await universalTable(namesMap, matches, true, false, 0)}</div>);
        }
      })

      // TODO: add spacing
      setBracket(<div style={{display: "flex", flexDirection: "column"}}>{tables}</div>);
    } else {
      setBracket(<p>Error</p>);
    }
  }
}

type Match = {
  matchId: number,
  firstTeamId: number,
  secondTeamId: number,
  firstTeamResult: number,
  secondTeamResult: number,
  stageId: number,
  stageIndex: number
}

async function getTeamNames(gameId: number) {
  const teamNameMap: Map<number, string> = new Map();
  await axios(`/team/list/participating/${gameId}/false/`)
  .then(response => {
    const teams = response.data;
    for (let team of teams) {
      if (!teamNameMap.has(team.teamId)) {
        teamNameMap.set(team.teamId, team.name);
      }
    }
  })
  return teamNameMap;
}

async function universalTable(teamNames: Map<number, string>, matches: Match[], accumulateScore: boolean, eliminating: boolean, skipPoints: number) {
  if (matches.length === 0) {
    return <p>No matches</p>;
  }
  const teamRows: Map<number, number> = new Map();
  const stageMatchesByLevel: Map<number, Match[]> = new Map();
  const rows: JSX.Element[][] = [];
  const teamOnRow: number[] = [];

  for (let match of matches) {
    const stageMatchesBuffer = stageMatchesByLevel.get(match.stageIndex)?? [];
    stageMatchesBuffer.push(match);
    stageMatchesByLevel.set(match.stageIndex, stageMatchesBuffer);

    const addRow = (teamId: number) => {
      if(!teamRows.has(teamId)) {
        teamRows.set(teamId, teamRows.size);
        rows.push([<td>{teamNames.get(teamId)?? "Unnamed"}</td>])
        teamOnRow.push(teamId);
      }
    }
    addRow(match.firstTeamId);
    addRow(match.secondTeamId);
  }

  const scoreMap: Map<number, number> = new Map();
  const isEliminatedByRow: Map<number, boolean> = new Map();
  for (let stageLevel = 0; stageLevel < stageMatchesByLevel.size; stageLevel++) {
    const matches = stageMatchesByLevel.get(stageLevel)?? [];
    const eliminatedTeams = [];

    for (let match of matches) {
      const firstTeamRow = teamRows.get(match.firstTeamId)?? -1;
      const secondTeamRow = teamRows.get(match.secondTeamId)?? -1;

      const firstScore = match.firstTeamResult;
      const secondScore = match.secondTeamResult;

      if (eliminating) {
        if (firstScore > secondScore) {
          eliminatedTeams.push(match.secondTeamId);
        } else if (secondScore > firstScore) {
          eliminatedTeams.push(match.firstTeamId);
        }
      }

      if (accumulateScore) {
        const firstScoreTemp = scoreMap.get(match.firstTeamId)?? 0;
        const secondScoreTemp = scoreMap.get(match.secondTeamId)?? 0;
        scoreMap.set(match.firstTeamId, firstScore + firstScoreTemp);
        scoreMap.set(match.secondTeamId, secondScore + secondScoreTemp);
      }

      rows[firstTeamRow].push(<td>{`vs. ${teamNames.get(match.secondTeamId)?? "Unnamed"} - ${accumulateScore ? scoreMap.get(match.firstTeamId) : firstScore}`}</td>);
      rows[secondTeamRow].push(<td>{`vs. ${teamNames.get(match.firstTeamId)?? "Unnamed"} - ${accumulateScore ? scoreMap.get(match.secondTeamId) : secondScore}`}</td>);
    }

    for (let row = 0; row < rows.length; row++) {
      const expectedLength = 1 + stageLevel + 1;
      if (rows[row].length < expectedLength) {
        if (isEliminatedByRow.get(row)) {
          rows[row].push(<td></td>);
        } else {
          rows[row].push(<td>Skip</td>);
          const skippedTeamScore = scoreMap.get(teamOnRow[row]) ?? 0;
          scoreMap.set(teamOnRow[row], skippedTeamScore + skipPoints);
        }
      }
    }

    for (let teamId of eliminatedTeams) {
      const teamRow = teamRows.get(teamId)?? -1;
      isEliminatedByRow.set(teamRow, true);
    }
  }

  const table: JSX.Element[] = [];
  const roundsHeader: JSX.Element[] = [];
  for (let round = 0; round < stageMatchesByLevel.size; round++) {
    roundsHeader.push(<th>Round {round + 1}</th>);
  }
  table.push(<tr><th></th>{roundsHeader}</tr>);

  for (let row of rows) {
    table.push(<tr>{row}</tr>);
  }

  return (
      <table className={classes.Table}>
        {table}
      </table>
  );
}
