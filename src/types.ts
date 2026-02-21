export interface Question {
  id: string;
  category: string;
  question: string;
  options: string[];
  points: number;
}

export interface UserProfile {
  name: string;
  mobile: string;
  businessName: string;
  businessWebsite?: string;
  industry: string;
  email: string;
}

export interface UserAnswer {
  questionId: string;
  questionText: string;
  selectedOption: string;
  points: number;
}