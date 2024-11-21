<template>
    <div class="resume-template">
        <!-- Full Name -->
        <h2 class="center-align">
            {{ resumeData.firstName || "First Name" }} {{ resumeData.lastName || "Last Name" }}
        </h2>
        <p class="center-align">
            {{ resumeData.city || "City" }}, {{ resumeData.state || "State" }} |
            {{ resumeData.phoneNumber || "Phone Number" }} |
            {{ resumeData.email || "Email Address" }} |
            {{ resumeData.website || "LinkedIn or Website URL" }}
        </p>

        <!-- Objective -->
        <section>
            <h3>OBJECTIVE</h3>
            <p>
                {{ resumeData.objective ||
                    "Recent graduate with a degree in marketing seeking an entry-level position in digital marketing. Experienced in creating social media campaigns and analyzing data to drive engagement and sales." }}
            </p>
        </section>

        <!-- Education -->
        <section>
            <h3>EDUCATION</h3>
            <p>
                {{ resumeData.universityName || "Oklahoma Christian University" }},
                {{ resumeData.universityCity || "City" }}, {{ resumeData.universityState || "State" }}
                <span class="float-right">{{ resumeData.startDate || "Start Month, Year" }} - {{ resumeData.endDate || "Projected Month, Year" }}</span>
            </p>
            <p>
                Bachelor of {{ resumeData.degree || "Arts/Science in XX" }}
            </p>
            <p>
                Minor(s) in .... {{ resumeData.minor || "(if applicable)" }}<br />
                Major GPR: {{ resumeData.majorGPR || "#.##" }}; Cumulative GPR: {{ resumeData.cumulativeGPR || "#.##" }}<br />
                Coursework: {{ resumeData.coursework || "(optional, only list if specifically requested)" }}
            </p>
        </section>

        <!-- Leadership -->
        <section>
            <h3>LEADERSHIP (or WORK EXPERIENCE, ACTIVITIES, VOLUNTEER WORK)</h3>
            <div>
                <p>
                    {{ resumeData.leadershipOrg || "Organization Name" }}
                    <span class="float-right">{{ resumeData.startDateLeadership || "Month Year" }} - {{ resumeData.endDateLeadership || "Month Year" }}</span>
                </p>
                <p class="italic">
                    {{ resumeData.positionTitle || "Position Title" }}
                </p>
                <ul>
                    <li>{{ resumeData.leadershipBullet1 || "Action Verb, followed by description of most relevant or important duties and accomplishments" }}</li>
                    <li>{{ resumeData.leadershipBullet2 || "Action Verb, followed by description of most relevant or important duties and accomplishments" }}</li>
                </ul>
            </div>
        </section>

        <!-- Work Experience -->
        <section>
            <h3>WORK EXPERIENCE (or LEADERSHIP, ACTIVITIES, VOLUNTEER WORK)</h3>
            <div>
                <p>
                    {{ resumeData.companyName || "Company Name" }},
                    {{ resumeData.companyCity || "City" }}, {{ resumeData.companyState || "State" }}
                    <span class="float-right">{{ resumeData.companyStart || "Month Year" }} - {{ resumeData.companyEnd || "Month Year" }}</span>
                </p>
                <p class="bold_and_italics">
                    {{ resumeData.jobTitle || "Job Title" }}
                </p>
                <ul>
                    <li>{{ resumeData.workBullet1 || "Action Verb, followed by description of most relevant or important duties and accomplishments" }}</li>
                    <li>{{ resumeData.workBullet2 || "Action Verb, followed by description of most relevant or important duties and accomplishments" }}</li>
                </ul>
            </div>
        </section>

        <!-- Honors and Awards -->
        <section>
            <h3>HONORS (and/or AWARDS)</h3>
            <p>
                {{ resumeData.honorTitle || "Honor/Award/Organization" }}
                <span class="float-right">{{ resumeData.honorDate || "Month Year - Month Year" }}</span>
            </p>
            <p>
                {{ resumeData.honorDescription || "Action Verb, followed by criteria for selection or explanation of involvement" }}
            </p>
        </section>

        <!-- Skills -->
        <section>
            <h3>SKILLS</h3>
            <p>
                {{ resumeData.skills ||
                    "List language skills and declare fluency (if applicable) | List relevant computer skills" }}
            </p>
        </section>
    </div>
</template>

<script>
export default {
    props: {
        resumeData: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>

<style scoped>
.resume-template {
    font-family: Times, serif;
    max-width: 800px;
    padding: 20px;
    margin: auto;
    background: white;
    color: black;
}

.center-align {
    text-align: center;
}

h3 {
    font-size: 16px;
    margin-top: 10px;
}

.float-right {
    float: right;
}

.bold {
    font-weight: bold;
}

.italic {
    font-style: italic;
}

.bold_and_italics {
    font-weight: bold;
    font-style: italic;
}

ul {
    margin: 10px 0;
    padding-left: 40px;
}
</style>
