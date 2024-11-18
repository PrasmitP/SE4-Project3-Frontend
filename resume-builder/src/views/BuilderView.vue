<template>
    <v-container>
        <v-col>
            <v-row justify="center">
                <v-card style="font-size: 30px; margin-bottom: 20px;">
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

                <!-- Education Section -->
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

                <!-- Skills Section -->
                <v-card color="primary" v-if="selectedTemplate !== 2" class="mb-4">
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

                <!-- Conditional Sections for Template 3 -->
                <v-card color="primary" v-if="selectedTemplate === 3" class="mb-4">
                    <v-card-title>
                        <h2>Honors & Awards</h2>
                    </v-card-title>
                    <v-row>
                        <!-- Add Award Fields here -->
                    </v-row>
                    <add-award />
                </v-card>

                <!-- Additional Template-specific Sections -->
                <v-card color="primary" v-if="selectedTemplate === 4" class="mb-4">
                    <v-card-title>
                        <h2>Projects</h2>
                    </v-card-title>
                    <v-row>
                        <!-- Add Project fields here -->
                    </v-row>
                    <add-project />
                </v-card>

                <v-card color="primary" v-if="selectedTemplate === 1" class="mb-4">
                    <v-card-title>
                        <h2>Accounting Hours</h2>
                    </v-card-title>
                    <v-row>
                        <!-- Add Accounting Hours fields here -->
                    </v-row>
                    <add-accounting-hours />
                </v-card>
            </v-form>
        </v-col>
        <v-btn to="build/saved" class="mt-4" @click="saveResume">Generate Resume</v-btn>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import TemplatePicker from '../components/TemplatePicker.vue';

let resumeName = ref("");
const states = ["Alabama", "Alaska", "Arizona", "Arkansas", /* ... more states */];
let currentEducation = ref([
    { universityName: "Oklahoma Christian University", city: "Edmond", state: "OK", startDate: "8/2021", endDate: "4/2025", degree: "Bachelor of Science in Computer Science", gpa: 3.5 },
    // Additional education data
]);
let currentExperience = ref([
    { companyName: "Company Name", jobTitle: "Job Title", startDate: "8/2021", endDate: "4/2025", city: "City", state: "State", accomplishments: ["Accomplishment 1"] },
    // Additional experience data
]);
let currentSkills = ref([
    { type: "Skill", skill: "Python" }, { type: "Skill", skill: "Java" }, /* ... more skills */
]);

const selectedTemplate = ref(null);
function handleTemplateSelection(id) {
    selectedTemplate.value = id;
}

function saveResume() {
    // Implement save functionality
}
</script>

<style scoped>
/* Add any styles here if needed */
</style>