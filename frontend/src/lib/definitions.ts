export type ContactDetails = {
    applicantName: string;
    applicantEmail: string;
    applicantPhone: string;
};

export type EducationEntry = {
    qualificationName: string;
    institutionName: string;
    completionDate: string;
};

export type EmploymentEntry = {
    jobTitle: string;
    companyName: string;
    jobDescription: string;
    startDate: string | null;
    endDate: string | null;
    dateRange: string | null;
};

export type PersonalProjectEntry = {
    projectName: string;
    projectDescription: string;
    projectDate: string;
};

export type ApplicantData = {
    contactDetails: ContactDetails;
    educationHistory: EducationEntry[];
    workExperience: EmploymentEntry[];
    personalProjects: PersonalProjectEntry[];
};