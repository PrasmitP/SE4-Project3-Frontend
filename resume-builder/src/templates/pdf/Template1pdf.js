import { jsPDF } from 'jspdf';

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
        `${resumeData.city}, ${resumeData.state} | ${resumeData.phoneNumber} | ${resumeData.email} ${resumeData.linkedInUrl ? "| " + resumeData.linkedInUrl : " "}`, 105, 28, { align: "center" }
    );

    // Professional Summary
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("PROFESSIONAL SUMMARY", 10, 40);
    doc.setLineWidth(0.5);
    doc.line(10, 42, 200, 42);
    doc.setFont("times", "normal");
    doc.text(
        resumeData.summary || "Enter your professional summary here.", 10, 47, { maxWidth: 190, lineHeightFactor: 1.5 }
    );

    // Education Section
    doc.setFont("times", "bold");
    doc.text("EDUCATION", 10, 68);
    doc.line(10, 70, 200, 70);
    doc.setFont("times", "italic");

    let educationY = 75;
    resumeData.educations.forEach((education) => {
        doc.setFont("times", "italic");
        doc.text(
            `${education.institutionName}, ${education.city}, ${education.state}`, 10, educationY
        );
        doc.setFont("times", "normal");
        doc.text(
            `${education.startDate} - ${education.endDate}`, 160, educationY, { align: "right" }
        );
        educationY += 7;
        doc.text(`${education.bachalorName}`, 10, educationY);
        educationY += 7;
        doc.text(`GPA: ${education.gpa}`, 10, educationY);
        educationY += 10;
    });


    // doc.setFont("times", "italic");
    // doc.text("(Accounting add your 150 hours)", 10, 106);

    // Professional Experience
    doc.setFont("times", "bold");
    doc.text("PROFESSIONAL EXPERIENCE", 10, 120);
    doc.line(10, 122, 200, 122);

    // Job Entry
    doc.setFont("times", "italic");
    let experienceY = 127;
    resumeData.experiences.forEach((experience) => {
        doc.setFont("times", "italic");
        doc.text(
            `${experience.companyName}, ${experience.jobTitle}, ${experience.city}, ${experience.state}`, 10, experienceY
        );
        doc.setFont("times", "normal");
        doc.text(
            `${experience.startDate} - ${experience.endDate}`, 160, experienceY, { align: "right" }
        );
        experienceY += 7;
        doc.text(`${experience.achievement}`, 10, experienceY);
        experienceY += 10;
    });

    // Skills and Other Sections
    doc.setFont("times", "bold");
    doc.text("SKILLS | LEADERSHIP SKILLS | ACTIVITIES | EXTRACURRICULAR ACTIVITIES", 10, 188);
    doc.line(10, 190, 200, 190);
    doc.setFont("times", "italic");
    doc.text(`Hard Skills / Computer Skills: ${resumeData.skills.join(", ") || ""}`, 10, 196);
    doc.text(`Language Skills: ${resumeData.languageSkills || ""}`, 10, 202);
}