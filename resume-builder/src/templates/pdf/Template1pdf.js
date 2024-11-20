import { jsPDF } from 'jspdf';

export function generateTemplate1(doc, resumeData) {
    doc.setFont("times", "normal");

    // Title - Full Name
    doc.setFontSize(16);
    doc.setFont("times", "bold");
    doc.text(`${resumeData.firstName || "First Name"} ${resumeData.lastName || "Last Name"}`, 105, 20, { align: "center" });

    // Contact Information
    doc.setFontSize(10);
    doc.setFont("times", "normal");
    doc.text(
        `${resumeData.city || "City"}, ${resumeData.state || "State"} | ${resumeData.phoneNumber || "(555) 555-5555"} | ${resumeData.email || "email@example.com"} | ${resumeData.website || "LinkedIn/Website URL (optional)"}`, 105, 28, { align: "center" }
    );

    // Professional Summary
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("PROFESSIONAL SUMMARY", 10, 40);
    doc.setLineWidth(0.5);
    doc.line(10, 42, 200, 42);
    doc.setFont("times", "normal");
    doc.text(
        resumeData.professionalSummary || "Enter your professional summary here.", 10, 47, { maxWidth: 190, lineHeightFactor: 1.5 }
    );

    // Education Section
    doc.setFont("times", "bold");
    doc.text("EDUCATION", 10, 68);
    doc.line(10, 70, 200, 70);
    doc.setFont("times", "italic");
    doc.text(
        `${resumeData.universityName || "University Name"}, ${resumeData.universityCity || "City"}, ${resumeData.universityState || "State"}`, 10, 75
    );
    doc.setFont("times", "normal");
    doc.text(
        `${resumeData.universityStart || "Start Month, Year"} - ${resumeData.universityEnd || "Projected Month, Year"}`, 160, 75, { align: "right" }
    );
    doc.text(`Bachelor of ${resumeData.degree || "Arts/Science in X"}`, 10, 82);
    doc.text(`GPA: ${resumeData.gpa || "(optional)"}`, 10, 88);
    doc.text(`Awards: ${resumeData.awards || "(optional)"}`, 10, 94);
    doc.text(`Coursework: ${resumeData.coursework || "(optional, only list if specifically requested)"}`, 10, 100);
    doc.setFont("times", "italic");
    doc.text("(Accounting add your 150 hours)", 10, 106);

    // Professional Experience
    doc.setFont("times", "bold");
    doc.text("PROFESSIONAL EXPERIENCE", 10, 120);
    doc.line(10, 122, 200, 122);

    // Job Entry
    doc.setFont("times", "italic");
    doc.text(
        `${resumeData.companyName || "Employer"}, ${resumeData.jobTitle || "Your Title"}, ${resumeData.companyCity || "City"}, ${resumeData.companyState || "State"}`, 10, 127
    );
    doc.setFont("times", "normal");
    doc.text(
        `${resumeData.companyStart || "Start Month, Year"} - ${resumeData.companyEnd || "End Month, Year"}`, 160, 127, { align: "right" }
    );

    const workBullets = [
        resumeData.workBullet1 || "Accomplished {X} as measured by {Y}, by doing {Z}",
        resumeData.workBullet2 || "Action + Project/Problem + Results = Accomplishment",
        resumeData.workBullet3 || "Three bullet points is sufficient for the most relevant position."
    ];

    let bulletY = 134;
    workBullets.forEach((bullet) => {
        const lines = doc.splitTextToSize(bullet, 180);
        const bulletHeight = lines.length * 4;

        doc.circle(14, bulletY, 1, 'F');
        doc.text(lines, 18, bulletY + 1);
        bulletY += bulletHeight + 3;
    });

    // Skills and Other Sections
    doc.setFont("times", "bold");
    doc.text("SKILLS | LEADERSHIP SKILLS | ACTIVITIES | EXTRACURRICULAR ACTIVITIES", 10, 188);
    doc.line(10, 190, 200, 190);
    doc.setFont("times", "italic");
    doc.text(`Hard Skills / Computer Skills: ${resumeData.skills || "(optional)"}`, 10, 196);
    doc.text(`Language Skills: ${resumeData.languageSkills || "(optional - include levels of proficiency)"}`, 10, 202);
}