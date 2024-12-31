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
