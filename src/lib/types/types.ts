export interface Question {
    clue: string
    answer: string
    points: number
    category: string
    row: number
    col: number
}

export interface Row {
    questions: Question[];
    category: string;
}

export interface ApiResponse {
    kind: "err" | "createdLobby" | "joinedLobby" | "playersJoined"
    data: ApiResponseSuccess | ApiResponseFailure
}

export interface ApiResponseFailure {
    err: string
}

export interface ApiResponseSuccess {
    message: any
}
