<script>
import { jsPDF } from 'jspdf';

// Template for the PDF content
const resumeTemplate = `
======================
       RESUME
======================

Template 1

[Personal Information]
First Name: {firstName}
Last Name: {lastName}
City: {city}
State: {state}
Phone Number: {phoneNumber}
Email: {email}
LinkedIn / Website: {website}

[Professional Summary]
Summary: {professionalSummary}

----------------------
       EDUCATION
----------------------
University Name: {universityName}
City: {universityCity}
State: {universityState}
Start Date: {universityStart}
Projected Graduation Date: {universityEnd}
Degree: Bachelor in {degree}

GPA (4.0 scale): {gpa}
Awards: {awards}
Coursework: {coursework}

----------------------
   PROFESSIONAL EXPERIENCE
----------------------
Employer: {companyName}
Title: {jobTitle}
City: {companyCity}
State: {companyState}
Dates: {companyStart} - {companyEnd}

Bullet Points:
1. {bullet1}
2. {bullet2}
3. {bullet3}
4. {bullet4}

----------------------
        SKILLS
----------------------
Hard Skills / Computer Skills: {skills}
Language Skills: {languageSkills}

----------------------
`;

export function generatePDF(resumeData, fileName = "Resume") {
    const doc = new jsPDF();

    // Populate the template with data from resumeData
    const filledTemplate = resumeTemplate
        .replace("{firstName}", resumeData.firstName || "N/A")
        .replace("{lastName}", resumeData.lastName || "N/A")
        .replace("{city}", resumeData.city || "N/A")
        .replace("{state}", resumeData.state || "N/A")
        .replace("{phoneNumber}", resumeData.phoneNumber || "N/A")
        .replace("{email}", resumeData.email || "N/A")
        .replace("{website}", resumeData.website || "N/A")
        .replace("{professionalSummary}", resumeData.professionalSummary || "N/A")
        .replace("{universityName}", resumeData.universityName || "N/A")
        .replace("{universityCity}", resumeData.universityCity || "N/A")
        .replace("{universityState}", resumeData.universityState || "N/A")
        .replace("{universityStart}", resumeData.universityStart || "N/A")
        .replace("{universityEnd}", resumeData.universityEnd || "N/A")
        .replace("{degree}", resumeData.degree || "N/A")
        .replace("{gpa}", resumeData.gpa || "N/A")
        .replace("{awards}", resumeData.awards || "N/A")
        .replace("{coursework}", resumeData.coursework || "N/A")
        .replace("{companyName}", resumeData.companyName || "N/A")
        .replace("{jobTitle}", resumeData.jobTitle || "N/A")
        .replace("{companyCity}", resumeData.companyCity || "N/A")
        .replace("{companyState}", resumeData.companyState || "N/A")
        .replace("{companyStart}", resumeData.companyStart || "N/A")
        .replace("{companyEnd}", resumeData.companyEnd || "N/A")
        .replace("{bullet1}", resumeData.bullet1 || "N/A")
        .replace("{bullet2}", resumeData.bullet2 || "N/A")
        .replace("{bullet3}", resumeData.bullet3 || "N/A")
        .replace("{bullet4}", resumeData.bullet4 || "N/A")
        .replace("{skills}", resumeData.skills || "N/A")
        .replace("{languageSkills}", resumeData.languageSkills || "N/A");

    // Add the filled template text to the PDF
    doc.setFontSize(12);
    doc.text(filledTemplate, 10, 10, { maxWidth: 180 });

    // Save/Download
    doc.save(`${fileName}.pdf`);
}
</script>