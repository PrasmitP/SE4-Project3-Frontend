import { jsPDF } from 'jspdf';

export function generateTemplate2(doc, resumeData) {
    doc.setFont("times", "normal");

    // Title - Full Name
    doc.setFontSize(20);
    doc.setFont("times", "bold");
    doc.text(`${resumeData.firstName || "First Name"} ${resumeData.lastName || "Last Name"}`, 10, 20);

    // Contact Information
    doc.setFontSize(10);
    doc.setFont("times", "normal");
    doc.text(`${resumeData.city || "City"}, ${resumeData.state || "State"} | ${resumeData.phoneNumber || "(555) 555-5555"} | ${resumeData.email || "email@example.com"} | ${resumeData.website || "LinkedIn/Website URL (optional)"}`, 10, 28);

    // Professional Summary
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("PROFESSIONAL SUMMARY (Optional)", 10, 40);
    doc.setFont("times", "normal");
    doc.text(
        resumeData.professionalSummary ||
        "Tells the reader the purpose of your resume in 3 (2-4 is okay) sentences • Should identify the kind of work you want to perform • If seeking an internship or co-op, include the time period when you are available to start. Example: Seeking a summer 2020 internship in Marketing or Public Relations.",
        10, 46, { maxWidth: 190, lineHeightFactor: 1.5 }
    );

    // Education Section
    doc.setFont("times", "bold");
    doc.text("EDUCATION", 10, 68);

    // Education Entry
    doc.setFont("times", "bold");
    doc.text(`${resumeData.universityName || "University of Oklahoma"}`, 10, 74);
    doc.setFont("times", "normal");
    doc.text(` | ${resumeData.universityStart || "August 2023"} - ${resumeData.universityEnd || "Projected May 2026"}`, 10 + doc.getTextWidth(`${resumeData.universityName || "University of Oklahoma"} `) + 1, 74);

    doc.setFont("times", "bolditalic");
    doc.text(`${resumeData.degree || "Master of XX"}`, 10, 80);
    doc.setFont("times", "normal");
    doc.text(`GPA ${resumeData.gpa || "4.0"}`, 10, 86);

    // Experience Section
    doc.setFont("times", "bold");
    doc.text("EXPERIENCE", 10, 148);

    // Experience Entry
    doc.setFont("times", "bold");
    doc.text(`${resumeData.jobTitle || "Job Role"}`, 10, 156);
    doc.setFont("times", "normal");
    doc.text(`, ${resumeData.companyName || "Name of Company"} | ${resumeData.companyStart || "08/2022"} - ${resumeData.companyEnd || "Present"}`, 9 + doc.getTextWidth(`${resumeData.jobTitle || "Job Role"}, `), 156);

    const workBullets = [
        resumeData.workBullet1 || "Accomplished {X} as measured by {Y}, by doing {Z}",
        resumeData.workBullet2 || "Action + Project/Problem = Results",
        resumeData.workBullet3 || "Three bullet points is sufficient for the most relevant position."
    ];
    let bulletY = 162;
    workBullets.forEach((bullet) => {
        const lines = doc.splitTextToSize(bullet, 180);
        const bulletHeight = lines.length * 4;

        doc.circle(20, bulletY, 1, 'F');
        doc.text(lines, 25, bulletY + 1);
        bulletY += bulletHeight + 3;
    });
}