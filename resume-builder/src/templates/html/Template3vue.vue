<template>
    <div class="resume-template">
        <!-- Full Name -->
        <h1 class="center-align">
            {{ resumeData.firstName || "First Name" }} {{ resumeData.lastName || "Last Name" }}
        </h1>
        <p class="center-align">
            {{ resumeData.city || "Edmond" }}, {{ resumeData.state || "OK" }} |
            {{ resumeData.phoneNumber || "405.453.3245" }} |
            {{ resumeData.email || "ike.eagle@eagles.oc.edu" }} |
            {{ resumeData.website || "LinkedIn Url / Website Url (optional)" }}
        </p>
        <hr />

        <!-- Professional Summary -->
        <p class="summary">
            {{ resumeData.professionalSummary ||
                "Analytic-focused data professional with 2+ years’ experience developing computational models and executing statistical projects to drive insights. Demonstrated ability to translate complex datasets into actionable information and support overarching research initiatives." }}
        </p>

        <!-- Education -->
        <section>
            <h3>EDUCATION</h3>
            <hr />
            <p>
                <strong>{{ resumeData.universityName || "Oklahoma Christian University" }}</strong>,
                {{ resumeData.universityCity || "City" }}, {{ resumeData.universityState || "State" }}
                <span class="float-right">{{ resumeData.universityEnd || "Projected May, 20xx" }}</span>
            </p>
            <p>
                {{ resumeData.degree || "Bachelor of Science in Computer Engineering" }}
                <span class="float-right">GPA: {{ resumeData.gpa || "3.xx/4.x" }}</span>
            </p>
        </section>

        <!-- Experience -->
        <section>
            <h3>EXPERIENCE</h3>
            <hr />
            <div class="experience-section">
                <p>
                    <strong>{{ resumeData.companyName || "Oklahoma Christian University" }}</strong>,
                    {{ resumeData.companyCity || "City" }}, {{ resumeData.companyState || "State" }}
                    <span class="float-right">{{ resumeData.companyStart || "August, 20xx" }} – {{ resumeData.companyEnd || "Present" }}</span>
                </p>
                <p>{{ resumeData.jobTitle || "Job Title" }}</p>
                <ul>
                    <li>{{ resumeData.workBullet1 || "Collaborated with cross-functional team to define and prioritize data science projects." }}</li>
                    <li>{{ resumeData.workBullet2 || "Conducted exploratory data analysis on large datasets using Python and SQL." }}</li>
                    <li>{{ resumeData.workBullet3 || "Developed statistical models to evaluate the effectiveness of algorithms." }}</li>
                    <li>{{ resumeData.workBullet4 || "Developed software tools and libraries in Python for data analysis and visualization." }}</li>
                    <li>{{ resumeData.workBullet5 || "Presented research updates using Tableau dashboards." }}</li>
                </ul>
            </div>
        </section>

        <!-- Projects -->
        <section>
            <h3>PROJECTS</h3>
            <hr />
            <div class="project-section">
                <p>
                    <strong>{{ resumeData.projectInstitution || "Oklahoma Christian University" }}</strong>,
                    {{ resumeData.projectCity || "City" }}, {{ resumeData.projectState || "State" }}
                    <span class="float-right">{{ resumeData.projectStart || "June, 20xx" }} – {{ resumeData.projectEnd || "August, 20xx" }}</span>
                </p>
                <p>{{ resumeData.projectTitle || "Undergraduate Researcher for the Computer Science Lab" }}</p>
                <ul>
                    <li>{{ resumeData.projectBullet1 || "Used SQL to extract and manipulate data for $250K funding." }}</li>
                    <li>{{ resumeData.projectBullet2 || "Maintained and updated ETL workflows for data integrity." }}</li>
                    <li>{{ resumeData.projectBullet3 || "Implemented data preprocessing for advanced analyses." }}</li>
                </ul>
            </div>
        </section>

        <!-- Skills -->
        <section>
            <h3>SKILLS</h3>
            <hr />
            <p>
                {{ resumeData.skills ||
                    "Simple Linear Regression | Multivariate Linear Regression | Statistical Modeling | Data Integrity | Parametric Tests | Nonparametric Tests | Sampling Methods | Natural Language Processing (NLP) Tableau | R | VBA | Excel | Python | SQL | Java" }}
            </p>
        </section>
    </div>
</template>

<script>
export default {
    props: {
        resumeData: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>

<style scoped>
.resume-template {
    border: 1px solid #000;
    padding: 20px;
    max-width: 800px;
    height: 1000px;
    margin: 0 auto;
    background-color: white;
    color: black;
}

.center-align {
    text-align: center;
    margin-bottom: 10px;
}

.float-right {
    float: right;
    margin-left: 10px;
}

h3 {
    margin-top: 20px;
}

ul {
    margin-top: 5px;
    padding-left: 40px;
}

hr {
    border: 0.5px solid #000;
    margin: 10px 0;
}
</style>
