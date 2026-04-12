export interface IBaseQuestion {
  id: string;
  question: string;
  explanation: string;
}

export type IMCQ = IBaseQuestion & {
  type: "mcq";
  options: string[];
  correctAnswer: string;
};

export type IMathMCQ = IBaseQuestion & {
  type: "math_mcq";
  formula: string;
  options: string[];
  correctAnswer: string;
};

export type IDragAndDrop = IBaseQuestion & {
  type: "drag_and_drop";
  items: string[];
  correctOrder: string[];
};

export type ISpeaking = IBaseQuestion & {
  type: "speaking";
  ttsPrompt: string;
};

export type IQuestion = IMCQ | IMathMCQ | IDragAndDrop | ISpeaking;

export interface IStimulus {
  title: string;
  content: string;
}

export interface ITest {
  id: string;
  title: string;
  durationInMinutes: number;
  stimulus: IStimulus;
  questions: IQuestion[];
}

export type TestData = { test: ITest };

export interface IResult {
  score: number;
  total: number;
  perQuestion: {
    id: string;
    correct: boolean;
    explanation: string;
    correctAnswer?: string;
    correctOrder?: string[];
    speakingSubmitted?: boolean;
  }[];
}