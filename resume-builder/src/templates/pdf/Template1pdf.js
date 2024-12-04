import { jsPDF } from "jspdf";

export function generateTemplate1(doc, resumeData) {
    doc.setFont("times", "normal");

    // Title - Full Name
    doc.setFontSize(16);
    doc.setFont("times", "bold");
    doc.text(`${resumeData.fName || "First Name"} ${resumeData.lName || "Last Name"}`, 105, 20, { align: "center" });

    // Contact Information
    doc.setFontSize(10);
    doc.setFont("times", "normal");
    doc.text(
        `${resumeData.city}, ${resumeData.state} | ${resumeData.phoneNumber} | ${resumeData.email} ${resumeData.linkedInUrl ? "| " + resumeData.linkedInUrl : ""}`, 105, 28, { align: "center" }
    );

    // Professional Summary
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    let currentY = 40; // Start Y position
    doc.text("PROFESSIONAL SUMMARY", 10, currentY);
    currentY += 2;
    doc.setLineWidth(0.5);
    doc.line(10, currentY, 200, currentY);
    currentY += 5;
    doc.setFont("times", "normal");
    doc.text(
        resumeData.summary || "Enter your professional summary here.", 10, currentY, { maxWidth: 190, lineHeightFactor: 1.5 }
    );
    currentY += 15; // Adjust dynamically for content height

    // Education Section
    doc.setFont("times", "bold");
    doc.text("EDUCATION", 10, currentY);
    currentY += 2;
    doc.line(10, currentY, 200, currentY);
    currentY += 5;
    doc.setFont("times", "italic");

    resumeData.educations.forEach((education) => {
        doc.text(`${education.institutionName}, ${education.city}, ${education.state}`, 10, currentY);
        doc.setFont("times", "normal");
        doc.text(`${education.startDate} - ${education.endDate}`, 160, currentY, { align: "right" });
        currentY += 7;
        doc.text(`${education.bachalorName}`, 10, currentY);
        currentY += 7;
        doc.text(`GPA: ${education.gpa}`, 10, currentY);
        currentY += 10;
    });

    // Professional Experience
    doc.setFont("times", "bold");
    doc.text("PROFESSIONAL EXPERIENCE", 10, currentY);
    currentY += 2;
    doc.line(10, currentY, 200, currentY);
    currentY += 5;

    resumeData.experiences.forEach((experience) => {
        doc.setFont("times", "italic");
        doc.text(`${experience.companyName}, ${experience.jobTitle}, ${experience.city}, ${experience.state}`, 10, currentY);
        doc.setFont("times", "normal");
        doc.text(`${experience.startDate} - ${experience.endDate}`, 160, currentY, { align: "right" });
        currentY += 7;
        doc.text(`${experience.achievement}`, 10, currentY);
        currentY += 10;
    });

    // Skills and Other Sections
    doc.setFont("times", "bold");
    doc.text("SKILLS | LEADERSHIP SKILLS | ACTIVITIES | EXTRACURRICULAR ACTIVITIES", 10, currentY);
    currentY += 2;
    doc.line(10, currentY, 200, currentY);
    currentY += 5;

    // Map skills and display their titles
    const skillsList = resumeData.skills
        .filter(skill => !skill.isLanguage) // Filter non-language skills
        .map(skill => skill.title) // Extract the title of each skill
        .join(", ") || "";
    const languagesList = resumeData.skills
        .filter(skill => skill.isLanguage) // Filter language skills
        .map(skill => `${skill.title} - ${skill.proficiencyLevel}`) // Combine title and proficiency level
        .join(", ") || "";

    doc.setFont("times", "italic");
    doc.text(`Hard Skills / Computer Skills: ${skillsList}`, 10, currentY);
    currentY += 6;
    doc.text(`Language Skills: ${languagesList}`, 10, currentY);
}
