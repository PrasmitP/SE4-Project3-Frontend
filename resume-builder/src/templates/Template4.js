import { jsPDF } from 'jspdf';

export function generateTemplate4(doc, resumeData) {
    doc.setFont("times", "normal");

    // Title - Full Name
    doc.setFontSize(20);
    doc.setFont("times", "bold");
    doc.text(`${resumeData.firstName || "First Name"} ${resumeData.lastName || "Last Name"}`, 105, 20, { align: "center" });

    // Contact Information
    doc.setFontSize(10);
    doc.setFont("arial", "normal");
    doc.text(
        `${resumeData.city || "City"}, ${resumeData.state || "State"} ♦ ${resumeData.phoneNumber || "Phone Number"} ♦ ${resumeData.email || "Email Address"} ♦ ${resumeData.website || "LinkedIn or Website URL"}`,
        doc.internal.pageSize.getWidth() / 2, 28, { align: "center" }
    );

    // Objective Section
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("OBJECTIVE", 10, 40);
    doc.setFont("times", "normal");
    doc.text(
        resumeData.objective || "Recent graduate with a degree in marketing seeking an entry-level position in digital marketing. Experienced in creating social media campaigns and analyzing data to drive engagement and sales.",
        10, 46, { maxWidth: 190, lineHeightFactor: 1.5 }
    );

    // Education Section
    doc.setFont("times", "bold");
    doc.text("EDUCATION", 10, 61);

    // Education Entry
    doc.setFont("times", "bold");
    doc.text(`${resumeData.universityName || "Oklahoma Christian University"}`, 10, 67);
    doc.setFont("times", "normal");
    doc.text(` , ${resumeData.universityCity || "City"}, ${resumeData.universityState || "State"}`, 11 + doc.getTextWidth(`${resumeData.universityName || "Oklahoma Christian University"}, `), 67);
    doc.text(`${resumeData.startDate || "Start Month, Year"} - ${resumeData.endDate || "Projected Month, Year"}`, 195, 67, { align: "right" });
    doc.text(`${resumeData.degree || "Bachelor of Arts /Bachelor of Science in XX /B.B.A in XX"}`, 10, 73);
    doc.text(`Minor(s): ${resumeData.minor || "(if applicable)"}`, 10, 79);
    doc.text(`Major GPR: ${resumeData.majorGPR || "#.##"}; Cumulative GPR: ${resumeData.cumulativeGPR || "#.##"}`, 10, 85);
    doc.text(`Coursework: ${resumeData.coursework || "(optional, only list if specifically requested)"}`, 10, 91);

    // Leadership Section
    doc.setFont("times", "bold");
    doc.text("LEADERSHIP (or WORK EXPERIENCE, ACTIVITIES, VOLUNTEER WORK)", 10, 106);

    let sectionY = 112;
    const leadershipEntries = [
        {
            organization: resumeData.leadershipOrg || "Organization Name",
            position: resumeData.positionTitle || "Position Title",
            startEnd: `${resumeData.startDateLeadership || "Month Year"} - ${resumeData.endDateLeadership || "Month Year"}`,
            bullets: [
                resumeData.leadershipBullet1 || "Action Verb, followed by description of most relevant or important duties and accomplishments",
                resumeData.leadershipBullet1 || "Action Verb, followed by description of most relevant or important duties and accomplishments"
            ]
        }
    ];

    leadershipEntries.forEach(entry => {
        doc.setFont("times", "bold");
        doc.text(entry.organization, 10, sectionY);
        doc.setFont("times", "normal");
        doc.text(entry.startEnd, 195, sectionY, { align: "right" });
        sectionY += 6;
        doc.setFont("times", "italic");
        doc.text(entry.position, 10, sectionY);

        sectionY += 6;
        doc.setFont("times", "normal");
        entry.bullets.forEach(bullet => {
            const lines = doc.splitTextToSize(bullet, 180);
            const bulletHeight = lines.length * 4;

            doc.circle(20, sectionY, 1, 'F');
            doc.text(lines, 25, sectionY + 1);
            sectionY += bulletHeight + 3;
        });
        sectionY += 6;
    });

    // Work Experience Section
    doc.setFont("times", "bold");
    doc.text("WORK EXPERIENCE (or LEADERSHIP, ACTIVITIES, VOLUNTEER WORK)", 10, sectionY + 8);

    sectionY += 14;
    const workExperience = {
        company: `${resumeData.companyName || "Company Name"}, ${resumeData.companyCity || "City"}, ${resumeData.companyState || "State"}`,
        jobTitle: resumeData.jobTitle || "Job Title",
        startEnd: `${resumeData.companyStart || "Month Year"} - ${resumeData.companyEnd || "Month Year"}`,
        bullets: [
            resumeData.workBullet1 || "Action Verb, followed by description of most relevant or important duties and accomplishments",
            resumeData.workBullet2 || "Action Verb, followed by description of most relevant or important duties and accomplishments"
        ]
    };

    doc.setFont("times", "normal");
    doc.text(workExperience.company, 10, sectionY);
    doc.text(workExperience.startEnd, 195, sectionY, { align: "right" });
    sectionY += 6;
    doc.setFont("times", "bold");
    doc.text(workExperience.jobTitle, 10, sectionY);

    sectionY += 6;
    doc.setFont("times", "normal");
    workExperience.bullets.forEach(bullet => {
        const lines = doc.splitTextToSize(bullet, 180);
        const bulletHeight = lines.length * 4;

        doc.circle(20, sectionY, 1, 'F');
        doc.text(lines, 25, sectionY + 1);
        sectionY += bulletHeight + 3;
    });

    // Honors Section
    sectionY += 12;
    doc.setFont("times", "bold");
    doc.text("HONORS (and/or AWARDS)", 10, sectionY);

    sectionY += 6;
    doc.setFont("times", "bold");
    doc.text(`${resumeData.honorTitle || "Honor/Award/Organization"}`, 10, sectionY);
    doc.setFont("times", "normal");
    doc.text(`${resumeData.honorDate || "Month Year - Month Year"}`, 195, sectionY, { align: "right" });
    sectionY += 6;
    doc.circle(20, sectionY, 1, 'F');
    doc.text(
        resumeData.honorDescription || "Action Verb, followed by criteria for selection or explanation of involvement",
        25, sectionY + 1, { maxWidth: 180 }
    );

    // Skills Section
    sectionY += 14;
    doc.setFont("times", "bold");
    doc.text("SKILLS", 10, sectionY);

    sectionY += 6;
    doc.setFont("times", "normal");
    doc.text(`${resumeData.skills || "List language skills and declare fluency (if applicable)\nList relevant computer skills"}`, 10, sectionY, { maxWidth: 190 });
}