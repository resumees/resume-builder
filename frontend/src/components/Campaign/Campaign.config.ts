import { ApplicantData, ContactDetails, EducationEntry, EmploymentEntry, PersonalProjectEntry } from "@/lib/definitions";

export const CAMPAIGN_TITLE_PLACEHOLDER = "Campaign Title";
export const CAMPAIGN_DESCRIPTION_PLACEHOLDER = "Enter a position description including key selection criteria, experience, etc";

const TEST_CONTACT_DETAILS:ContactDetails = {
    applicantName: "John Doe",
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
    startDate: "2020",
    endDate: "2024",
    dateRange: null,
}

const TEST_EMPLOYMENT_PREVIOUS:EmploymentEntry = {
    jobTitle: "Junior Software Engineer",
    companyName: "Test Company",
    jobDescription: "Made a macro to push on save.",
    startDate: "2018",
    endDate: "2020",
    dateRange: null,
}

const TEST_PERSONAL_PROJECT:PersonalProjectEntry = {
    projectName: "Social Media App",
    projectDescription: "Supported 5000 users",
    projectDate: "2019",
}

export const TEST_APPLICANT_DATA:ApplicantData[] = [{
    contactDetails: TEST_CONTACT_DETAILS,
    educationHistory: [TEST_EDUCATION_MASTERS, TEST_EDUCATION_BACHELORS],
    workExperience: [TEST_EMPLOYMENT_LATEST, TEST_EMPLOYMENT_PREVIOUS],
    personalProjects: [TEST_PERSONAL_PROJECT],
}]