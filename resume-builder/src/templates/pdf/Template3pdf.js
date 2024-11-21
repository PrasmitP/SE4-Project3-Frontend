import { jsPDF } from 'jspdf';

export function generateTemplate3(doc, resumeData) {
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