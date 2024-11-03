<template>
    <v-row class="iconRow">
        <v-icon @click="goToBuild">mdi-pencil</v-icon>
        <v-icon @click="downloadPDF">mdi-download</v-icon>
        <v-icon @click="deleteResume">mdi-delete</v-icon>
    </v-row>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { jsPDF } from 'jspdf';

const props = defineProps({
    resumeObject: {
        type: Object
    },
    resumeName: {
        type: String,
        default: 'New Resume'
    }
});
// I should probably have these in the services folder
const router = useRouter(); 
const goToBuild = () => {
    router.push('/build');
}

const deleteResume = () => {
    console.log("delete resume");
}

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

const downloadPDF = () => {
    const doc = new jsPDF();

    // Populate the template with data from props or data variables
    const filledTemplate = resumeTemplate
        .replace("{firstName}", props.firstName || "N/A")
        .replace("{lastName}", props.lastName || "N/A")
        .replace("{city}", props.city || "N/A")
        .replace("{state}", props.state || "N/A")
        .replace("{phoneNumber}", props.phoneNumber || "N/A")
        .replace("{email}", props.email || "N/A")
        .replace("{website}", props.website || "N/A")
        .replace("{professionalSummary}", props.professionalSummary || "N/A")
        .replace("{universityName}", props.universityName || "N/A")
        .replace("{universityCity}", props.universityCity || "N/A")
        .replace("{universityState}", props.universityState || "N/A")
        .replace("{universityStart}", props.universityStart || "N/A")
        .replace("{universityEnd}", props.universityEnd || "N/A")
        .replace("{degree}", props.degree || "N/A")
        .replace("{gpa}", props.gpa || "N/A")
        .replace("{awards}", props.awards || "N/A")
        .replace("{coursework}", props.coursework || "N/A")
        .replace("{companyName}", props.companyName || "N/A")
        .replace("{jobTitle}", props.jobTitle || "N/A")
        .replace("{companyCity}", props.companyCity || "N/A")
        .replace("{companyState}", props.companyState || "N/A")
        .replace("{companyStart}", props.companyStart || "N/A")
        .replace("{companyEnd}", props.companyEnd || "N/A")
        .replace("{bullet1}", props.bullet1 || "N/A")
        .replace("{bullet2}", props.bullet2 || "N/A")
        .replace("{bullet3}", props.bullet3 || "N/A")
        .replace("{bullet4}", props.bullet4 || "N/A")
        .replace("{skills}", props.skills || "N/A")
        .replace("{languageSkills}", props.languageSkills || "N/A");

    // Add the filled template text to the PDF
    doc.setFontSize(12);
    doc.text(filledTemplate, 10, 10, { maxWidth: 180 });

    // Save/Download
    const fileName = props.resumeName || "New Resume";
    doc.save(`${fileName}.pdf`);
}
</script>

<style scoped>
.iconRow {
    color: white;
    z-index: 1;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    scale: 0.75;
    margin: 0;
}
.v-icon {
    cursor: pointer;
    transition: transform 0.2s;
}

.v-icon:hover {
    transform: scale(1.2);
}
</style>