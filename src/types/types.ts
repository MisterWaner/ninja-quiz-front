export type Subject = {
    id: number;
    name: string;
    themes: Theme[];
    subjectPath: string;
};

export type Theme = {
    id: number;
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
}

export type User = {
    id?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
};
