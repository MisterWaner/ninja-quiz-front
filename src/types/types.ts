export type Subject = {
    id: number;
    name: string;
    themes: Theme[];
    subjectPath: string;
};

export type Theme = {
    id: string;
    name: string;
    type: string;
    subjectId: number;
    themePath: string;
};

export type QuestionType = 'multiple' | 'direct' | 'trueOrFalse';

export interface QuestionBase {
    id: number;
    questionType: QuestionType;
    theme: Theme;
    questionText: string;
    imgUrl?: string;
}

export interface MultipleChoiceQuestion extends QuestionBase {
    questionType: 'multiple';
    options: string[];
    correctAnswer: string | string[];
}

export interface DirectQuestion extends QuestionBase {
    questionType: 'direct';
    correctAnswer: string;
}

export interface TrueOrFalseQuestion extends QuestionBase {
    questionType: 'trueOrFalse';
    options: boolean[];
    correctAnswer: boolean | string;
}

export interface Quiz {
    id: number;
    questionType: QuestionType;
    questions: (
        | MultipleChoiceQuestion
        | DirectQuestion
        | TrueOrFalseQuestion
    )[];
    themeId: Theme['id'];
    subjectId: Subject['id'];
}

export type User = {
    id?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
};

export type Score = {
    id: number;
    userId: User['id'];
    subjectId: Subject['id'];
    themeId: Theme['id'];
    value: number;
    date: Date;
}

export type UserGlobalScore = {
    userId: User['id'];
    username: User['username'];
    totalScore: number;
}

export type UserDailyScore = {
    userId: User['id'];
    username: User['username'];
    totalScore: number;
    date: Score['date'];
}

export type UserGlobalScoreByTheme = {
    userId: User['id'];
    username: User['username'];
    themeName: Theme['name'];
    totalScore: number;
}

export type UserGlobalScoreBySubject = {
    userId: User['id'];
    username: User['username'];
    subjectName: Subject['name'];
    totalScore: number;
}