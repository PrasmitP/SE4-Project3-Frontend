<template>
    <div class="wrapper">
        <div class="resumePreview" @click="goToBuild">
            <div v-if="name === 'New Resume'" class="circle">
                <div class="plusSign">+</div>
            </div>
        </div>
        <p>{{ resumeName }}</p>

        <!--Download PDF Button-->
        <v-btn v-if="name !== 'New Resume'" color="primary" @click="generatePDF">Download Resume as PDF</v-btn>
    </div>
</template>

<script setup>
// Import for PDF
import { jsPDF } from 'jspdf';

import { useRouter } from 'vue-router';

const props = defineProps({
    name: {
        type: String,
        default: "New Resume"
    }
});

let resumeName = props.name; 

const router = useRouter();
const goToBuild = () => {
    router.push('/build');
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

const generatePDF = () => {
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
    const fileName = resumeName || "New Resume";
    doc.save(`${fileName}.pdf`);
};
</script>

<style scoped>
p {
    text-align: center;
    font-size: 12px;
}

.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    width: fit-content;
}

.resumePreview {
    width: 90px;
    height: 160px;
    background-color: lightgrey;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.resumePreview:hover .circle {
    transform: scale(1.1);
}

.resumePreview:hover .plusSign {
    transform: scale(1.1);
}

.plusSign {
    font-size: 48px;
    color: black;
    transition: transform 0.3s;
}

.circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
}
</style>