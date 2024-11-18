<template>
    <v-container>
        <v-col>
            <v-row justify="center">
                <v-card color="transparent" style="font-size: 30px; margin-bottom: 10px;">
                    <span class="font-weight-light">Information for {{ userBody.fName + " " + userBody.lName }}</span>
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
                                <v-text-field v-model="userBody.fName" label="First Name *" type="text"
                                    required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="userBody.lName" label="Last Name *" type="text"
                                    required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="userBody.city" label="City *" type="text"
                                    required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-select v-model="userBody.state" label="State *" :items="states" required></v-select>
                            </v-col>
                        </v-row>
                    </v-card>

                    <v-card color="transparent" class="mb-3">
                        <v-card-title>
                            <h3>Contact and Links</h3>
                        </v-card-title>
                        <v-row>
                            <v-col>
                                <v-text-field v-model="userBody.phoneNumber" label="Phone Number *" type="phone-number"
                                    required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="userBody.contactEmail" label="Email *" type="email"
                                    required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="userBody.linkedInUrl" label="LinkedIn/Website"
                                    type="text"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-card>


                <!-- Education Section -->
                <v-card color="primary" class="mb-4">

                    <v-card-title>
                        <h2>Education</h2>
                    </v-card-title>

                    <v-card color="transparent" class="mb-3">
                        <v-row>
                            <v-col v-for="education in currentEducations" cols="6">
                                <v-card class="mb-2">
                                    <v-btn @click="editEducation">Edit</v-btn>
                                    <v-btn @click="deleteEducation(education.educationId)">Delete</v-btn>
                                    <v-card-title>
                                        <h3>{{ education.institutionName }}</h3>
                                    </v-card-title>
                                    <v-card-text>
                                        <p>{{ education.degree || education.bachalorName }}</p>
                                        <p>{{ education.city }}, {{ education.state }}</p>
                                        <p>{{ education.startDate }} - {{ education.endDate }}</p>
                                        <p>GPA: {{ education.gpa }}</p>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                        <add-education :userId="userId" :educationList="currentEducations" />
                    </v-card>
                </v-card>

                <!-- Professional Experience Section -->
                <v-card color="secondary" class="mb-4">
                    <v-card-title>
                        <h2>Professional Experience</h2>
                    </v-card-title>

                    <v-card color="transparent" class="mb-3">
                        <v-row>
                            <v-col v-for="experience in currentExperiences" cols="6">
                                <v-btn @click="editExperience">Edit</v-btn>
                                <v-btn @click="deleteExperience(experience.experienceId)">Delete</v-btn>
                                <v-card class="mb-2">
                                    <v-card-title>
                                        <h3>{{ experience.companyName }}</h3>
                                    </v-card-title>
                                    <v-card-text>
                                        <p>{{ experience.jobRole }}</p>
                                        <p>{{ experience.city }}, {{ experience.state }}</p>
                                        <p>{{ experience.startDate }} - {{ experience.endDate }}</p>
                                        <p v-for="accomplishment in experience.accomplishments" :key="accomplishment">{{
                                            accomplishment }}</p>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                        <add-experience :userId="userId" :experienceList="currentExperiences" />
                    </v-card>
                </v-card>

                <!-- Skills -->
                <v-card color="primary" v-if="selectedTemplate === 1 || selectedTemplate === 3" class="mb-4">
                    <v-card-title>
                        <h2>Skills</h2>
                    </v-card-title>
                    <v-row>
                        <v-col v-for="skill in currentSkills" cols="2">
                            <v-card class="mb-2">
                                <v-btn @click="editSkill">Edit</v-btn>
                                <v-btn @click="deleteSkill(skill.skillId)">Delete</v-btn>
                                <v-card-text v-if="skill.type == 'Language'">
                                    <h3>{{ skill.title }} - {{ skill.proficiency }}</h3>
                                </v-card-text>
                                <v-card-title v-else>
                                    <h3>{{ skill.title }}</h3>
                                </v-card-title>
                            </v-card>
                        </v-col>
                    </v-row>
                    <add-skill :userId="userId" :skillList="currentSkills" />
                </v-card>

                <!-- Projects Section -->
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
import Utils from '@/config/utils.js';
import userServices from '@/services/userServices.js';
import educationServices from '@/services/educationServices';
import experienceServices from '@/services/experienceServices';
import skillServices from '@/services/skillServices';

let userBody = ref({
    fName: "",
    lName: "",
    city: "",
    state: "",
    phoneNumber: "",
    email: "",
    contactEmail: "",
    linkedInUrl: "",
})

// start of lists of data for resume

let currentEducations = ref([])
let currentExperiences = ref([])
let currentSkills = ref([])

const userStore = ref(null);
userStore.value = Utils.getStore("user");
let userId = userStore.value.userId

// constants for data editing
const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida",
    "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
    "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska",
    "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
    "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
    "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
]
const statesShort = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA",
    "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK",
    "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];
const proficiencyLevels = [
    "Beginner", "Intermediate", "Advanced", "Fluent", "Native"
];

// getting user's data from the backend
userServices.getUserForId(userId).then(response => {
        userBody.value = response.data;
    })
    .catch(e => {
        console.log(e);
    });

educationServices.getAllForUser(userId).then((res) => {
    res.data.forEach((item) => {
        let education = item;
        console.log(item)
        currentEducations.value.push(education);
    });
});
experienceServices.getAllForUser(userId).then((res) => {
    res.data.forEach((item) => {
        let experience = item;
        console.log(item)
        currentExperiences.value.push(experience);
    });
});
skillServices.getAllForUser(userId).then((res) => {
    res.data.forEach((item) => {
        let skill = item;
        console.log(item)
        currentSkills.value.push(skill);
    });
});



let saveUser = () => {
    userBody.updatedAt = new Date();
    userServices.update(userId, userBody.value)
        .then(response => {
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
}
</script>

<style scoped></style>