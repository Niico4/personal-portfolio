export interface WorkExperienceType {
  id: string;
  organizationName: string;
  organizationLogoURL: string;
  role: string;
  startDate: string;
  endDate: string | null;
  isCurrentPosition: boolean;
  isFreelance: boolean;
  features: string[];
}
