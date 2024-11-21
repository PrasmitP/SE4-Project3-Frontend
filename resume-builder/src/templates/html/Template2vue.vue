<template>
    <div class="resume-template">
        <!-- Full Name -->
        <h1>
            {{ resumeData.firstName || "First Name" }} {{ resumeData.lastName || "Last Name" }}
        </h1>
        
        <!-- Contact Information -->
        <p>
            {{ resumeData.city || "Edmond" }}, {{ resumeData.state || "OK" }} | 
            {{ resumeData.phoneNumber || "405.444.4444" }} | 
            {{ resumeData.email || "ike.eagle@eagles.oc.edu" }} | 
            {{ resumeData.website || "LinkedIn/Website URL (optional)" }}
        </p>

        <!-- Professional Summary -->
        <section>
            <h3>PROFESSIONAL SUMMARY (Optional)</h3>
            <p>
                {{ resumeData.professionalSummary || 
                "Tells the reader the purpose of your resume in 3 (2-4 is okay) sentences • Should identify the kind of work you want to perform • If seeking an internship or co-op, include the time period when you are available to start. Example: Seeking a summer 2020 internship in Marketing or Public Relations." }}
            </p>
        </section>

        <!-- Education Section -->
        <section>
            <h3>EDUCATION</h3>
            <p>
                <span class="bold">{{ resumeData.universityName || "University of Oklahoma" }}</span>
                <span> | {{ resumeData.universityStart || "August 2023" }} - {{ resumeData.universityEnd || "Projected May 2026" }}</span>
            </p>
            <p class="italic"><strong>{{ resumeData.degree || "Master of XX" }}</strong></p>
            <p>GPA {{ resumeData.gpa || "4.0" }}</p>
        </section>

        <!-- Professional Experience -->
        <section>
            <h3>EXPERIENCE</h3>
            <p>
                <strong>{{ resumeData.jobTitle || "Job Role" }}</strong>, 
                {{ resumeData.companyName || "Name of Company" }}
                <span> | {{ resumeData.companyStart || "08/2022" }} - {{ resumeData.companyEnd || "Present" }}</span>
            </p>
            <ul>
                <li>{{ resumeData.workBullet1 || "Accomplished {X} as measured by {Y}, by doing {Z}" }}</li>
                <li>{{ resumeData.workBullet2 || "Action + Project/Problem = Results" }}</li>
                <li>{{ resumeData.workBullet3 || "Three bullet points is sufficient for the most relevant position." }}</li>
            </ul>
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
* {
    color: black;
}

.resume-template {
    border: 1px solid #000;
    padding: 20px;
    max-width: 800px;
    height: 1000px;
    margin: 0 auto;
    background-color: white;
}

.bold {
    font-weight: bold;
}

h3 {
    margin-top: 10px;
}

.italic {
    font-style: italic;
}

hr {
    border: 0.5px solid #000;
    width: 100%;
    margin: 5px 0;
}

ul {
    margin: 10px 0;
    padding-left: 40px;
}
</style>
