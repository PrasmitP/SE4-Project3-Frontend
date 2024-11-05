import { jsPDF } from 'jspdf';

/**
 * Generate a PDF resume based on selected template.
 * @param {Object} resumeData - The data to populate the resume.
 * @param {String} fileName - The file name for the downloaded PDF.
 * @param {String} templateId - The selected template ID (e.g., 'Template 1', 'Template 2').
 */
 export function generatePDF(resumeData, fileName = "Resume", templateId = "Template 1") {
    const doc = new jsPDF();

    switch (templateId) {
        case "Template 1":
            generateTemplate1(doc, resumeData);
            break;
        
        // Future templates can be added here
        case "Template 2":
            generateTemplate2(doc, resumeData); // Placeholder for Template 2
            break;
        
        case "Template 3":
            generateTemplate3(doc, resumeData); // Placeholder for Template 3
            break;

        case "Template 4":
            generateTemplate4(doc, resumeData); // Placeholder for Template 4
            break;

        default:
            generateTemplate1(doc, resumeData); // Default to Template 1 if not specified
    }

    // Save/Download
    doc.save(`${fileName}.pdf`);
}

// Template 1
function generateTemplate1(doc, resumeData) {
    doc.setFont("times", "normal");

    // Title - Full Name
    doc.setFontSize(16);
    doc.setFont("times", "bold");
    doc.text(`${resumeData.firstName || "First Name"} ${resumeData.lastName || "Last Name"}`, 105, 20, { align: "center" });

    // Contact Information
    doc.setFontSize(10);
    doc.setFont("times", "italic");
    doc.text(
        `${resumeData.city || "City"}, ${resumeData.state || "State"} | ${resumeData.phoneNumber || "(555) 555-5555"} | ${resumeData.email || "email@example.com"} | ${resumeData.website || "LinkedIn/Website URL (optional)"}`,
        105,
        28,
        { align: "center" }
    );

    // Professional Summary
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("PROFESSIONAL SUMMARY", 10, 40);
    doc.setLineWidth(0.5);
    doc.line(10, 42, 200, 42);
    doc.setFont("times", "normal");
    doc.text(
        resumeData.professionalSummary || "Enter your professional summary here.",
        10, 46, { maxWidth: 190, lineHeightFactor: 1.5 }
    );

    // Education Section
    doc.setFont("times", "bold");
    doc.text("EDUCATION", 10, 68);
    doc.line(10, 70, 200, 70);
    doc.setFont("times", "italic");
    doc.text(
        `${resumeData.universityName || "University Name"}, ${resumeData.universityCity || "City"}, ${resumeData.universityState || "State"}`,
        10, 74
    );
    doc.setFont("times", "normal");
    doc.text(
        `${resumeData.universityStart || "Start Month, Year"} - ${resumeData.universityEnd || "Projected Month, Year"}`,
        160, 74, { align: "right" }
    );
    doc.text(`Bachelor of ${resumeData.degree || "Arts/Science in X"}`, 10, 82);
    doc.text(`GPA: ${resumeData.gpa || "(optional)"}`, 10, 90);
    doc.text(`Awards: ${resumeData.awards || "(optional)"}`, 10, 96);
    doc.text(`Coursework: ${resumeData.coursework || "(optional, only list if specifically requested)"}`, 10, 102);
    doc.setFont("times", "italic");
    doc.text("(Accounting add your 150 hours)", 10, 108);

    // Professional Experience
    doc.setFont("times", "bold");
    doc.text("PROFESSIONAL EXPERIENCE", 10, 120);
    doc.line(10, 122, 200, 122);

    // Example Job Entry 1
    doc.setFont("times", "italic");
    doc.text(
        `${resumeData.companyName || "Employer"}, ${resumeData.jobTitle || "Your Title"}, ${resumeData.companyCity || "City"}, ${resumeData.companyState || "State"}`,
        10, 128
    );
    doc.setFont("times", "normal");
    doc.text(
        `${resumeData.companyStart || "Start Month, Year"} - ${resumeData.companyEnd || "End Month, Year"}`,
        160, 128, { align: "right" }
    );

    // Example bullet points
    const bulletOffsetX = 14; // Move bullets to the right
    const bulletOffsetY = 136; // Start bullets a bit lower
    const bulletSpacing = 6; // Space between bullet points

    doc.circle(bulletOffsetX, bulletOffsetY, 1, 'F');
    doc.text(resumeData.bullet1 || "Accomplished {X} as measured by {Y}, by doing {Z}", bulletOffsetX + 3, bulletOffsetY);

    doc.circle(bulletOffsetX, bulletOffsetY + bulletSpacing, 1, 'F');
    doc.text(resumeData.bullet2 || "Action + Project/Problem + Results = Accomplishment", bulletOffsetX + 3, bulletOffsetY + bulletSpacing);

    doc.circle(bulletOffsetX, bulletOffsetY + bulletSpacing * 2, 1, 'F');
    doc.text(resumeData.bullet3 || "Three bullet points is sufficient for the most relevant position.", bulletOffsetX + 3, bulletOffsetY + bulletSpacing * 2);

    // Additional Experience Entry if available
    if (resumeData.company2Name) {
        doc.setFont("times", "italic");
        doc.text(
            `${resumeData.company2Name || "Employer"}, ${resumeData.jobTitle2 || "Your Title"}, ${resumeData.company2City || "City"}, ${resumeData.company2State || "State"}`,
            10, 158
        );
        doc.setFont("times", "normal");
        doc.text(
            `${resumeData.company2Start || "Start Month, Year"} - ${resumeData.company2End || "End Month, Year"}`,
            160, 158, { align: "right" }
        );

        // Second set of bullet points
        doc.circle(12, 164, 1, 'F');
        doc.text(resumeData.bullet2_1 || "Filed papers and organized 100+ employee documents...", 15, 164, { maxWidth: 180 });
        doc.circle(12, 174, 1, 'F');
        doc.text(resumeData.bullet2_2 || "Led a 5-person leadership team to increase student participation...", 15, 174, { maxWidth: 180 });
    }

    // Skills and Other Sections
    doc.setFont("times", "bold");
    doc.text("SKILLS | LEADERSHIP SKILLS | ACTIVITIES | EXTRACURRICULAR ACTIVITIES", 10, 188);
    doc.line(10, 190, 200, 190);
    doc.setFont("times", "italic");
    doc.text(`Hard Skills / Computer Skills: ${resumeData.skills || "(optional)"}`, 10, 196);
    doc.text(`Language Skills: ${resumeData.languageSkills || "(optional – include levels of proficiency)"}`, 10, 202);
}
// Placeholder functions for other templates
function generateTemplate2(doc, resumeData) {
    // Layout for Template 2
    doc.text("This is Template 2", 10, 10);
}

function generateTemplate3(doc, resumeData) {
    // Layout for Template 3
    doc.text("This is Template 3", 10, 10);
}

function generateTemplate4(doc, resumeData) {
    // Layout for Template 4
    doc.text("This is Template 4", 10, 10);
}