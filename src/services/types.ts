/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

export type BaseResponse<T> = {
  status: number;
  message: string;
  data: T;
};

export type RegisterResponse = {
  email: string;
  student_id?: string;
  first_name: string;
  last_name: string;
  college: string;
};

export type LoginResponse = {
  email: string;
  student_id?: string;
  first_name: string;
  last_name: string;
  college: string;
};

export type AddSubjectResponse = {
  id: number;
  subject_title: string;
  subject_description: string;
  section: string;
  students: string;
};

export type GetSubjectResponse = {
  id: number;
  subject_title: string;
  subject_description: string;
  section: string;
  students: string;
};

export type AddAssessmentResponse = {
  id: number;
  subject_id: number;
  assessment_title: string;
  assessment_description: string;
  assessment_status: string;
  subject_title: string;
  subject_section: string;
  result: string;
  passing: string;
};

export type GetAssessmentResponse = {
  id: number;
  subject_id: number;
  assessment_title: string;
  assessment_description: string;
  assessment_status: "ACTIVE" | "INACTIVE";
  assessment_hash: string;
  subject_title: string;
  subject_section: string;
  result: string;
  passing: string;
  email?: string;
};

export type AddChoicesResponse = {
  choiceId: number;
  choiceType: "A" | "B" | "C" | "D";
  choice: string;
  answer: boolean;
}

export type AddQuestionsResponse = {
  questionNumber: number;
  question: string;
  choices: AddChoicesResponse[];
};

export type GetChoicesResponse = {
  choiceId: string;
  choiceType: "A" | "B" | "C" | "D";
  choice: string;
  answer: string;
}

export type GetQuestionsResponse = {
  question_number: string;
  question: string;
  choices: GetChoicesResponse[];
};

export type AddStudentToSubjectResponse = {
  student_id: number;
  subject_id: number;
};
