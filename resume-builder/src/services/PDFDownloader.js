import { jsPDF } from 'jspdf';

/**
 * Generate a PDF resume based on selected template.
 * @param {Object} resumeData - The data to populate the resume.
 * @param {String} fileName - The file name for the downloaded PDF.
 * @param {String} templateId - The selected template ID (e.g., 'Template 1', 'Template 2').
 */
 export function generatePDF(resumeData, fileName = "Resume", templateId = "Template 4") {
    const doc = new jsPDF();

    switch (templateId) {
        case "Template 1":
            generateTemplate1(doc, resumeData);
            break;
        
        case "Template 2":
            generateTemplate2(doc, resumeData);
            break;
        
        case "Template 3":
            generateTemplate3(doc, resumeData);
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

// Template 2
function generateTemplate2(doc, resumeData) {
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

// Template 3
function generateTemplate3(doc, resumeData) {
    doc.setFont("times", "normal");

    // Title - Full Name
    doc.setFontSize(20);
    doc.setFont("times", "bold");
    doc.text(`${resumeData.firstName || "First Name"} ${resumeData.lastName || "Last Name"}`, 105, 20, { align: "center" });

    // Contact Information
    doc.setFontSize(10);
    doc.setFont("times", "normal");
    doc.text(
        `${resumeData.city || "City"}, ${resumeData.state || "State"} | ${resumeData.phoneNumber || "(555) 555-5555"} | ${resumeData.email || "email@example.com"} | ${resumeData.website || "LinkedIn Url / Website Url (optional)"}`,
        10,
        28
    );
    doc.line(10, 32, 200, 32);

    // Professional Summary
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
        resumeData.professionalSummary ||
        "Analytic-focused data professional with 2+ years’ experience developing computational models and executing statistical projects to drive insights. Demonstrated ability to translate complex datasets into actionable information and support overarching research initiatives.",
        10, 38, { maxWidth: 190, lineHeightFactor: 1.5 }
    );

    // Education Section
    doc.setFont("times", "bold");
    doc.text("EDUCATION", 10, 58);
    doc.line(10, 60, 200, 60);

    // Education Entry
    doc.setFont("times", "bold");
    doc.text(`${resumeData.universityName || "Oklahoma Christian University"}`, 10, 68);
    doc.setFont("times", "normal");
    const cityStateText = `, ${resumeData.universityCity || "City"}, ${resumeData.universityState || "State"}`;
    doc.text(cityStateText, 10 + doc.getTextWidth(`${resumeData.universityName || "Oklahoma Christian University"} `) + 3, 68);
    doc.text(`${resumeData.universityEnd || "Projected May, 20xx"}`, 160, 68, { align: "right" });
    doc.text(`GPA: ${resumeData.gpa || "3.xx/4.x"}`, 160, 74, { align: "right" });
    doc.text(`${resumeData.degree || "Bachelor of Science in Computer Engineering"}`, 10, 74);

    // Experience Section
    doc.setFont("times", "bold");
    doc.text("EXPERIENCE", 10, 90);
    doc.line(10, 92, 200, 92);

    // Experience Entry
    doc.setFont("times", "bold");
    doc.text(`${resumeData.companyName || "Oklahoma Christian University"}`, 10, 100);
    doc.setFont("times", "normal");
    doc.text(`, ${resumeData.companyCity || "City"}, ${resumeData.companyState || "State"}`, 10 + doc.getTextWidth(`${resumeData.companyName || "Oklahoma Christian University"} `) + 3, 100);
    doc.text(`${resumeData.companyStart || "August, 20xx"} – ${resumeData.companyEnd || "Present"}`, 160, 100, { align: "right" });
    doc.text(`${resumeData.jobTitle || "Job Title"}`, 10, 106);

    // Experience bullets with automatic height adjustment
    const workBullets = [
        resumeData.workBullet1 || "Collaborated with cross-functional team of computer, electrical, and mechanical engineers to define and prioritize data science projects, driving $1.5M NIST-funded research in multimedia storage systems",
        resumeData.workBullet2 || "Conducted exploratory data analysis (EDA) on large datasets using Python and SQL, identifying key trends and patterns to inform research focused on multimedia bit rate conversion",
        resumeData.workBullet3 || "Conducted statistical analysis of experimental results to evaluate the effectiveness of algorithms and models",
        resumeData.workBullet4 || "Developed software tools and libraries in Python to facilitate data analysis, visualization, and modeling",
        resumeData.workBullet5 || "Presented weekly research updates with Tableau dashboards and made recommendations to primary investigator on study direction"
    ];

    let bulletY = 112;
    workBullets.forEach((bullet) => {
        const lines = doc.splitTextToSize(bullet, 180);
        const bulletHeight = lines.length * 4;

        doc.circle(20, bulletY, 1, 'F');
        doc.text(lines, 25, bulletY + 1);
        bulletY += bulletHeight + 3;
    });

    // Projects Section
    doc.setFont("times", "bold");
    doc.text("PROJECTS", 10, bulletY + 8);
    doc.line(10, bulletY + 10, 200, bulletY + 10);

    // Project Entry
    bulletY += 18;
    doc.setFont("times", "bold");
    doc.text(`${resumeData.projectInstitution || "Oklahoma Christian University"}`, 10, bulletY); // Institution name in bold
    doc.setFont("times", "normal");
    doc.text(`, ${resumeData.projectCity || "City"}, ${resumeData.projectState || "State"}`, 10 + doc.getTextWidth(`${resumeData.projectInstitution || "Oklahoma Christian University"} `) + 3, bulletY);
    doc.text(`${resumeData.projectStart || "June, 20xx"} – ${resumeData.projectEnd || "August, 20xx"}`, 160, bulletY, { align: "right" });
    bulletY += 6;
    doc.text(`${resumeData.projectTitle || "Undergraduate Researcher for the Computer Science Lab"}`, 10, bulletY);

    // Project bullets
    const projectBullets = [
        resumeData.projectBullet1 || "Used SQL to extract and manipulate data from relational databases for $250K funding",
        resumeData.projectBullet2 || "Maintained and updated existing data pipelines and extract, transform, and load (ETL) workflows to ensure data integrity and reliability",
        resumeData.projectBullet3 || "Implemented data cleaning and preprocessing from raw Excel data to transfer into Stata for further analyses"
    ];
    bulletY += 6;
    projectBullets.forEach((bullet) => {
        const lines = doc.splitTextToSize(bullet, 180);
        const bulletHeight = lines.length * 4;

        doc.circle(20, bulletY, 1, 'F');
        doc.text(lines, 25, bulletY + 1);
        bulletY += bulletHeight + 3;
    });

    // Skills Section
    doc.setFont("times", "bold");
    doc.text("SKILLS", 10, bulletY + 8);
    doc.line(10, bulletY + 10, 200, bulletY + 10);
    doc.setFont("times", "normal");
    doc.text(resumeData.skills || "Simple Linear Regression | Multivariate Linear Regression | Statistical Modeling | Data Integrity | Parametric Tests | Nonparametric Tests | Sampling Methods | Natural Language Processing (NLP) Tableau | R | VBA | Excel | Python | SQL | Java", 10, bulletY + 16, { maxWidth: 190 });
}

// Template 4
function generateTemplate4(doc, resumeData) {
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