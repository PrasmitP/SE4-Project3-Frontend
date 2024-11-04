<template>
    <v-btn color="primary" @click="generatePDF">Download Resume as PDF</v-btn>
</template>

<script setup>
import { jsPDF } from 'jspdf';
import { defineProps } from 'vue';

const props = defineProps({
    resumeData: {
        type: Object,
        required: true,
    },
    fileName: {
        type: String,
        default: 'Resume',
    }
});

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

const generatePDF = () => {
    const doc = new jsPDF();

    // Populate the template with data from props.resumeData
    const filledTemplate = resumeTemplate
        .replace("{firstName}", props.resumeData.firstName || "N/A")
        .replace("{lastName}", props.resumeData.lastName || "N/A")
        .replace("{city}", props.resumeData.city || "N/A")
        .replace("{state}", props.resumeData.state || "N/A")
        .replace("{phoneNumber}", props.resumeData.phoneNumber || "N/A")
        .replace("{email}", props.resumeData.email || "N/A")
        .replace("{website}", props.resumeData.website || "N/A")
        .replace("{professionalSummary}", props.resumeData.professionalSummary || "N/A")
        .replace("{universityName}", props.resumeData.universityName || "N/A")
        .replace("{universityCity}", props.resumeData.universityCity || "N/A")
        .replace("{universityState}", props.resumeData.universityState || "N/A")
        .replace("{universityStart}", props.resumeData.universityStart || "N/A")
        .replace("{universityEnd}", props.resumeData.universityEnd || "N/A")
        .replace("{degree}", props.resumeData.degree || "N/A")
        .replace("{gpa}", props.resumeData.gpa || "N/A")
        .replace("{awards}", props.resumeData.awards || "N/A")
        .replace("{coursework}", props.resumeData.coursework || "N/A")
        .replace("{companyName}", props.resumeData.companyName || "N/A")
        .replace("{jobTitle}", props.resumeData.jobTitle || "N/A")
        .replace("{companyCity}", props.resumeData.companyCity || "N/A")
        .replace("{companyState}", props.resumeData.companyState || "N/A")
        .replace("{companyStart}", props.resumeData.companyStart || "N/A")
        .replace("{companyEnd}", props.resumeData.companyEnd || "N/A")
        .replace("{bullet1}", props.resumeData.bullet1 || "N/A")
        .replace("{bullet2}", props.resumeData.bullet2 || "N/A")
        .replace("{bullet3}", props.resumeData.bullet3 || "N/A")
        .replace("{bullet4}", props.resumeData.bullet4 || "N/A")
        .replace("{skills}", props.resumeData.skills || "N/A")
        .replace("{languageSkills}", props.resumeData.languageSkills || "N/A");

    // Add the filled template text to the PDF
    doc.setFontSize(12);
    doc.text(filledTemplate, 10, 10, { maxWidth: 180 });

    // Save/Download
    doc.save(`${props.fileName}.pdf`);
};
</script>