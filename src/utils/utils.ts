import { Game, Rank } from "../types/types";

export function getGameById(gameId: number, games: Game[]) {
    if (games === undefined || games === null) {
        console.error(`Games should not be undefined before calling getGameById!`);
        return undefined;
    }
    for (let gameObject of games) {
        if (gameObject.gameId === gameId) {
            return gameObject;
        }
    }
    return undefined;
}

export function getRankById(id: Number, ranks: Rank[]) {
    if (ranks === undefined || ranks === null ) {
        console.error(`Ranks should not be undefined before calling getRankById!`);
        return undefined;
    }
    for(let rank of ranks){
        if(rank.rankId === id){
            return rank;
        }
    }
    return undefined;
}
            