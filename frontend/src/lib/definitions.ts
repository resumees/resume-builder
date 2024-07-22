export type ContactDetails = {
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
    endDate: string | null;
};

export type PersonalProjectEntry = {
    projectName: string;
    projectDescription: string;
    projectDate: string;
};

export type ApplicantData = {
    _id: string;
    documentName: string;
    submittedDate: Date;
    candidateScore: number;
    contactDetails: ContactDetails;
    educationHistory: EducationEntry[];
    workExperience: EmploymentEntry[];
    personalProjects: PersonalProjectEntry[];
};

export type CampaignData = {
    _id: string;
    documentName: string;
    documentDescription: string;
    applicant: ApplicantData[];
}