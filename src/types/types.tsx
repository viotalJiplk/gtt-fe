export enum headingTypes {
    'h1' = 'h1',
    'h2' = 'h2',
    'h3' = 'h3',
    'main' = 'main'
}

export enum GAMETYPES {
    'MINECRAFT' = 'MINECRAFT',
    'COUNTER_STRIKE' = 'COUNTER STRIKE',
    'COUNTER STRIKE' = 'COUNTER STRIKE',
    'LOL' = 'LOL',
    'ROCKET_LEAGUE' = 'ROCKET LEAGUE',
    'ROCKET LEAGUE' = 'ROCKET LEAGUE',
    'VALORANT' = 'VALORANT',
    'R6' = 'R6',
}

export enum ROLES {
    'CAPTAIN' = 'CAPTAIN',
    'MEMBER' = 'MEMBER',
    'RESERVIST' = 'RESERVIST'
}

export enum REGISTRATIONVARIANTS {
    'TEAM' = 'TEAM',
    'ALONE' = 'ALONE'
}

export interface Contestant {
    name: string,
    surname: string
    email: string
    discord: string,
    nickname: string,
    csRank?: string,
    faceitLevel?: string,
    maxCsRank?: string,
    maxFaceitLevel?: string,
    epicId?: string,
    adult: boolean
    schoolId?: any,
    role?: ROLES,
    externist?: boolean

}

export interface ApiError {
    kind: string,
    msg: string
}

export interface School {
    schoolId: number,
    name: string
}

export interface Game {
    name: string,
    registrationStart: string,
    registrationEnd: string,
    maxTeams: number,
    gameId: number
}
  
export interface GeneratedRole{
    roleName: string,
    discordRoleId: number,
    discordRoleIdEligible: number,
    gameId: number,
    default: Boolean,
    minimal: number,
    maximal: number,
    generatedRoleId: number
}

interface Player{
    userId: string,
    nick: string,
    generatedRoleId: number
}

export interface Team{
    name: string,
    teamId: number,
    gameId: number,
    joinString?: string,
    Players: Player[]
}

export interface GeneratedRolePermission{
    generatedRolePermissionId: number,
    permission: string,
    generatedRoleId: number,
    gameId: number,
    eligible: number
}

export interface DiscordUserObject{
    id: string,
    username: string,
    avatar: string,
    discriminator: string,
    public_flags: number,
    flags: number,
    banner: number,
    accent_color: number,
    global_name: number,
    banner_color: number
}