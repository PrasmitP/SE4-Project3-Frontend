import { jsPDF } from 'jspdf';

export function generateTemplate2(doc, resumeData) {
    doc.setFont("times", "normal");

    // Title - Full Name
    doc.setFontSize(20);
    doc.setFont("times", "bold");
    doc.text(`${resumeData.fName} ${resumeData.lName}`, 10, 20);

    // Contact Information
    doc.setFontSize(10);
    doc.setFont("times", "normal");
    doc.text(`${resumeData.city || "City"}, ${resumeData.state || "State"} | ${resumeData.phoneNumber || "(555) 555-5555"} | ${resumeData.email || "email@example.com"} | ${resumeData.linkedInUrl || "LinkedIn/Website URL (optional)"}`, 10, 28);

    // Professional Summary
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("PROFESSIONAL SUMMARY (Optional)", 10, 40);
    doc.setFont("times", "normal");
    doc.text(
        resumeData.summary ||
        "Tells the reader the purpose of your resume in 3 (2-4 is okay) sentences • Should identify the kind of work you want to perform • If seeking an internship or co-op, include the time period when you are available to start. Example: Seeking a summer 2020 internship in Marketing or Public Relations.",
        10, 46, { maxWidth: 190, lineHeightFactor: 1.5 }
    );

    // Education Section
    doc.setFont("times", "bold");
    doc.text("EDUCATION", 10, 68);

    // Education Entry
    resumeData.educations.forEach((education) => {
        doc.setFont("times", "bold");
        doc.text(`${education.institutionName}`, 10, 74);
        doc.setFont("times", "normal");
        doc.text(` | ${education.startDate} - ${education.endDate}`, 10 + doc.getTextWidth(`${education.city} `) + 1, 74);

        doc.setFont("times", "bolditalic");
        doc.text(`${education.bachelor}`, 10, 80);
        doc.setFont("times", "normal");
        doc.text(`GPA ${education.gpa}`, 10, 86);
    });
    // Experience Section
    doc.setFont("times", "bold");
    doc.text("EXPERIENCE", 10, 148);

    // Experience Entry
    
    doc.setFont("times", "bold");
    doc.text(`${experience.jobTitle || "Job Role"}`, 10, 156);
    doc.setFont("times", "normal");
    doc.text(`, ${resumeData.companyName || "Name of Company"} | ${resumeData.companyStart || "08/2022"} - ${resumeData.companyEnd || "Present"}`, 9 + doc.getTextWidth(`${resumeData.jobTitle || "Job Role"}, `), 156);
    doc.text(`${experience.achievement}`, 10, currentY);

}