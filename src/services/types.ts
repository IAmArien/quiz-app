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

export type AddAnswerChoicesResponse = {
  choiceId: number;
  choiceType: "A" | "B" | "C" | "D";
  choice: string;
  answer: boolean;
  selected: boolean;
};

export type AddAnswersResponse = {
  questionNumber: number;
  question: string;
  choices: AddAnswerChoicesResponse[];
};

export type GetAnswerChoicesResponse = {
  choiceId: string;
  choiceType: "A" | "B" | "C" | "D";
  choice: string;
  answer: string;
  selected: string;
}

export type GetAnswersResponse = {
  question_number: string;
  question: string;
  choices: GetAnswerChoicesResponse[];
};

export type GetStudentSubjectResponse = {
  subject_id: number;
  subject_title: string;
  section: string;
  subject_description: string;
  assessments: string;
  assessments_data: GetStudentSubjectAssessmentsResponse[];
};

export type GetStudentSubjectAssessmentsResponse = {
  assessment_id: string;
  assessment_title: string;
  assessment_subject_id: string;
  assessment_status: string;
  assessment_hash: string;
  instructor_email: string;
};
