/**
 * Property of the Earn G. Bautista and Team
 * Reuse as a whole or in part is prohibited without permission.
 */

export type BaseResponse<T> = {
  status: number;
  message: string;
  data: T;
};

export type LoginResponse = {
  email: string;
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
  subject_title: string;
  subject_section: string;
  result: string;
  passing: string;
};
