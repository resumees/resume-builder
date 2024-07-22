import { ApplicantData, CampaignData, ContactDetails, EducationEntry, EmploymentEntry, PersonalProjectEntry } from "@/lib/definitions";

export const CAMPAIGN_TITLE_PLACEHOLDER = "Campaign Title";
export const CAMPAIGN_DESCRIPTION_PLACEHOLDER = "Enter a position description including key selection criteria, experience, etc";

const TEST_CONTACT_DETAILS:ContactDetails = {
    applicantEmail: "example@test.com",
    applicantPhone: "040000000",
};

const TEST_EDUCATION_MASTERS:EducationEntry = {
    qualificationName: "Master of IT",
    institutionName: "Sample University",
    completionDate: "2024",
};

const TEST_EDUCATION_BACHELORS:EducationEntry = {
    qualificationName: "Bachelor of IT",
    institutionName: "Sample University",
    completionDate: "2020"
};

const TEST_EMPLOYMENT_LATEST:EmploymentEntry = {
    jobTitle: "Senior Software Engineer",
    companyName: "Test Company",
    jobDescription: "Entire company depended on me",
    endDate: "2024",
}

const TEST_EMPLOYMENT_PREVIOUS:EmploymentEntry = {
    jobTitle: "Junior Software Engineer",
    companyName: "Test Company",
    jobDescription: "Made a macro to push on save.",
    endDate: "2020",
}

const TEST_PERSONAL_PROJECT:PersonalProjectEntry = {
    projectName: "Social Media App",
    projectDescription: "Supported 5000 users",
    projectDate: "2019",
}

const currentDate = new Date();

export const TEST_APPLICANT_DATA:ApplicantData[] = [{
    _id: "0",
    documentName: "John Doe",
    submittedDate: currentDate,
    candidateScore: 42,
    contactDetails: TEST_CONTACT_DETAILS,
    educationHistory: [TEST_EDUCATION_MASTERS, TEST_EDUCATION_BACHELORS],
    workExperience: [TEST_EMPLOYMENT_LATEST, TEST_EMPLOYMENT_PREVIOUS],
    personalProjects: [TEST_PERSONAL_PROJECT],
}]

export const TEST_CAMPAIGN_DATA:CampaignData = {
    _id: "0",
    documentName: "Placeholder Campaign",
    documentDescription: "Placeholder Campaign",
    applicant: TEST_APPLICANT_DATA,
}

export type Campaign = {
    _id: string;
    documentName: string;
    documentDescription: string;
}