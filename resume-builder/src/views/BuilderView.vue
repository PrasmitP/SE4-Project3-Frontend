<template>
    <v-container>
        <v-col>
            <v-row justify="center">
                <v-card style="font-size: 30px; margin-bottom: 10px;">
                    <span class="font-weight-light" v-if="resumeName">{{ resumeName }}</span>
                    <span class="font-weight-light" v-else>NewResume</span>
                </v-card>
            </v-row>
            <v-text-field label="File Name" type="text" placeholder="NewResume" v-model="resumeName" class="mb-3"></v-text-field>

            <!-- Template Picker -->
            <v-row justify="center" class="mb-4">
                <v-card color="transparent">
                    <template-picker @template-selected="handleTemplateSelection" />
                </v-card>
            </v-row>

            <v-form>
                <!-- Basic Information Section -->
                <v-card color="secondary" class="mb-4">
                    <v-card-title>
                        <h2>Basic Information</h2>
                    </v-card-title>

                    <v-card color="transparent" class="mb-3">
                        <v-card-title>
                            <h3>Name and City</h3>
                        </v-card-title>
                        <v-row>
                            <v-col>
                                <v-text-field label="First Name *" type="text" required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field label="Last Name *" type="text" required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field label="City *" type="text" required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-select label="State *" :items="states" required></v-select>
                            </v-col>
                        </v-row>
                    </v-card>

                    <v-card color="transparent" class="mb-3">
                        <v-card-title>
                            <h3>Contact and Links</h3>
                        </v-card-title>
                        <v-row>
                            <v-col>
                                <v-text-field label="Phone Number *" type="phone-number" required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field label="Email *" type="email" required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field label="LinkedIn/Website" type="text"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card>

                    <v-card-title>
                        <h3>Professional Summary</h3>
                    </v-card-title>
                    <v-textarea v-if="selectedTemplate !== 3" label="Professional Summary *" required class="mb-3"></v-textarea>
                    <v-textarea v-if="selectedTemplate === 3" label="Career Objective" optional class="mb-3"></v-textarea>
                </v-card>

                <!-- Education Section (with Accounting Hours for Template 1) -->
                <v-card color="primary" class="mb-4">
                    <v-card-title>
                        <h2>Education</h2>
                    </v-card-title>

                    <v-card color="transparent" class="mb-3">
                        <v-row>
                            <v-col v-for="education in currentEducation" :key="education.universityName" cols="6">
                                <v-card class="mb-2">
                                    <v-card-title>
                                        <h3>{{ education.universityName }}</h3>
                                    </v-card-title>
                                    <v-card-text>
                                        <p>{{ education.degree }}</p>
                                        <p>{{ education.city }}, {{ education.state }}</p>
                                        <p>{{ education.startDate }} - {{ education.endDate }}</p>
                                        <p>GPA: {{ education.gpa }}</p>
                                        <!-- Template 1: Accounting Hours included in Education -->
                                        <v-text-field v-if="selectedTemplate === 1" label="Accounting Hours" type="number"></v-text-field>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                        <add-education />
                    </v-card>
                </v-card>

                <!-- Professional Experience Section -->
                <v-card color="secondary" class="mb-4">
                    <v-card-title>
                        <h2>Professional Experience</h2>
                    </v-card-title>

                    <v-card color="transparent" class="mb-3">
                        <v-row>
                            <v-col v-for="experience in currentExperience" :key="experience.companyName" cols="6">
                                <v-card class="mb-2">
                                    <v-card-title>
                                        <h3>{{ experience.companyName }}</h3>
                                    </v-card-title>
                                    <v-card-text>
                                        <p>{{ experience.jobTitle }}</p>
                                        <p>{{ experience.city }}, {{ experience.state }}</p>
                                        <p>{{ experience.startDate }} - {{ experience.endDate }}</p>
                                        <p v-for="accomplishment in experience.accomplishments" :key="accomplishment">{{ accomplishment }}</p>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                        <add-experience />
                    </v-card>
                </v-card>

                <!-- Template 3: Projects Section (below Experience) -->
                <v-card color="primary" v-if="selectedTemplate === 3" class="mb-4">
                    <v-card-title>
                        <h2>Projects</h2>
                    </v-card-title>
                    <v-row>
                        <!-- Add Project Fields here -->
                    </v-row>
                    <add-project />
                </v-card>

                <!-- Conditional Sections for Template 1, 3, and 4 -->
                
                <!-- Template 1 & 3: Skills Section -->
                <v-card color="primary" v-if="selectedTemplate === 1 || selectedTemplate === 3" class="mb-4">
                    <v-card-title>
                        <h2>Skills</h2>
                    </v-card-title>
                    <v-row>
                        <v-col v-for="skill in currentSkills" :key="skill.skill" cols="2">
                            <v-card class="mb-2">
                                <v-card-text v-if="skill.type == 'Language'">
                                    <h3>{{ skill.skill }} - {{ skill.proficiency }}</h3>
                                </v-card-text>
                                <v-card-title v-else>
                                    <h3>{{ skill.skill }}</h3>
                                </v-card-title>
                            </v-card>
                        </v-col>
                    </v-row>
                    <add-skill />
                </v-card>

                <!-- Template 3: Honors & Awards Section -->
                <v-card color="primary" v-if="selectedTemplate === 3" class="mb-4">
                    <v-card-title>
                        <h2>Honors & Awards</h2>
                    </v-card-title>
                    <v-row>
                        <!-- Add Award Fields here -->
                    </v-row>
                    <add-award />
                </v-card>

                <!-- Template 4: Skills Section (Computer Skills only) -->
                <v-card color="primary" v-if="selectedTemplate === 4" class="mb-4">
                    <v-card-title>
                        <h2>Skills</h2>
                    </v-card-title>
                    <v-row>
                        <v-col v-for="skill in currentSkills" :key="skill.skill" cols="2">
                            <v-card class="mb-2">
                                <v-card-title>
                                    <h3>{{ skill.skill }}</h3>
                                </v-card-title>
                            </v-card>
                        </v-col>
                    </v-row>
                    <add-skill />
                </v-card>

                <!-- Template 4: Projects Section -->
                <v-card color="primary" v-if="selectedTemplate === 4" class="mb-4">
                    <v-card-title>
                        <h2>Projects</h2>
                    </v-card-title>
                    <v-row>
                        <!-- Add Project fields here -->
                    </v-row>
                    <add-project />
                </v-card>

            </v-form>
        </v-col>
        <v-btn to="build/saved" class="mt-4">Generate Resume</v-btn>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import TemplatePicker from '../components/TemplatePicker.vue';

const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida",
    "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
    "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska",
    "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
    "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
    "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

let currentEducation = ref([
    { universityName: "Oklahoma Christian University", city: "Edmond", state: "OK", startDate: "8/2021", endDate: "4/2025", degree: "Bachelor of Science in Computer Science", gpa: 3.5 },
    { universityName: "Harrisburg University of Science and Technology", city: "Harrisburg", state: "PA", startDate: "8/2016", endDate: "4/2021", degree: "DegreeHere", gpa: 2.0 },
    { universityName: "University of Oklahoma", city: "Norman", state: "OK", startDate: "8/2015", endDate: "4/2019", degree: "DegreeHere", gpa: 3.0 }
]);

let currentExperience = ref([
    { companyName: "Company Name", jobTitle: "Job Title", startDate: "8/2021", endDate: "4/2025", city: "City", state: "State", accomplishments: ["Accomplishment 1"] },
    { companyName: "Company Name", jobTitle: "Job Title", startDate: "8/2021", endDate: "4/2025", city: "City", state: "State", accomplishments: ["Accomplishment 2"] }
]);

let currentSkills = ref([
    { type: "Skill", skill: "Python" }, { type: "Skill", skill: "Java" }, { type: "Skill", skill: "C++" }, { type: "Language", skill: "Spanish", proficiency: "Fluent" }
]);

const selectedTemplate = ref(null);

function handleTemplateSelection(id) {
    selectedTemplate.value = id;
}

</script>

<style scoped>
.resumePreview {
    width: 135px;
    height: 240px;
    background-color: lightgrey;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.resumePreview.selected {
    border: 2px solid #1976d2;
}

v-card {
    margin-bottom: 15px;
    padding: 10px;
}

v-row {
    margin-bottom: 10px;
}

v-col {
    padding: 5px;
}

.v-btn {
    margin-top: 20px;
}
</style>
