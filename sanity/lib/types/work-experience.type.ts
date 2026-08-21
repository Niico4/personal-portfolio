export interface WorkExperienceType {
  id: string;
  name: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string | null;
  isCurrentPosition: boolean;
  features: string[];
}
