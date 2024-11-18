<template>
    <v-container>
        <v-col>
            <v-row justify="center">
                <v-card style="font-size: 30px; margin-bottom: 20px;">
                    <span class="font-weight-light" v-if="resumeName">{{ resumeName }}</span>
                    <span class="font-weight-light" v-else>NewResume</span>
                </v-card>
            </v-row>
            <v-text-field label="File Name" type="text" placeholder="NewResume" v-model="resumeName"></v-text-field>
            <v-row justify="center">
                <v-card color="transparent">
                    <template-picker />
                </v-card></v-row>
            <v-form>
                <v-card color="secondary">
                    <v-card-title>
                        <h2>Basic Information</h2>
                    </v-card-title>
                    <v-card color="transparent">
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
                    <v-card color="transparent">
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
                    <v-textarea label="Professional Summary *" required></v-textarea>
                </v-card>

                <!-- Education component -->
                <v-card color="primary">
                    <v-card-title>
                        <h2>Education</h2>
                    </v-card-title>
                    <v-card color="transparent">
                        <v-row>
                            <v-col v-for="education in currentEducations" cols="6">
                                <v-card>
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

                <!-- Experience component -->
                <v-card color="secondary">
                    <v-card-title>
                        <h2>Professional Experience</h2>
                    </v-card-title>
                    <v-card color="transparent">
                        <v-row>
                            <v-col v-for="experience in currentExperiences" cols="6">
                                <v-btn @click="editExperience">Edit</v-btn>
                                <v-btn @click="deleteExperience(experience.experienceId)">Delete</v-btn>
                                <v-card>
                                    <v-card-title>
                                        <h3>{{ experience.companyName }}</h3>
                                    </v-card-title>
                                    <v-card-text>
                                        <p>{{ experience.jobRole }}</p>
                                        <p>{{ experience.city }}, {{ experience.state }}</p>
                                        <p>{{ experience.startDate }} - {{ experience.endDate }}</p>
                                        <p v-for="accomplishment in experience.accomplishments">{{ accomplishment }}
                                        </p>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                        <add-experience :userId="userId" :experienceList="currentExperiences"/>
                    </v-card>
                </v-card>


                <!-- Skills component -->
                <v-card color="primary">
                    <v-card-title>
                        <h2>Skills</h2>
                    </v-card-title>
                    <v-row>
                        <v-col v-for="skill in currentSkills" cols="2">
                            <v-card>
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
                    <add-skill :userId="userId" :skillList="currentSkills"/>
                </v-card>
            </v-form>
        </v-col>
        <v-btn to="build/saved" @click="saveResume">Generate Resume</v-btn>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import Utils from '@/config/utils';
import resumeServices from '@/services/resumeServices';
import educationServices from '@/services/educationServices';
import experienceServices from '@/services/experienceServices';
import skillServices from '@/services/skillServices';

// creating important variables for the page

let resumeName = ref("");
let user = Utils.getStore("user");
let userId = user.userId;

// start of constant for data editing

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

// start of lists of data for resume

let currentEducations = ref([])
let currentExperiences = ref([])
let currentSkills = ref([])

// functions that send requests to backend

let saveResume = () => {
    let resumeData = {
        title: resumeName.value,
        template: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: user.userId,
    }
    resumeServices.create(resumeData)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
}
let deleteEducation = (educationId) => {
    educationServices.delete(educationId)
        .then((response) => {
            console.log(response);
            currentEducations.value = currentEducations.value.filter(education => education.educationId !== educationId)
        })
        .catch((error) => {
            console.log(error);
        })
}
let deleteExperience = (experienceId) => {
    experienceServices.delete(experienceId)
        .then((response) => {
            console.log(response);
            currentExperiences.value = currentExperiences.value.filter(experience => experience.experienceId !== experienceId)
        })
        .catch((error) => {
            console.log(error);
        })
}
let deleteSkill = (skillId) => {
    skillServices.delete(skillId)
        .then((response) => {
            console.log(response);
            currentSkills.value = currentSkills.value.filter(skill => skill.skillId !== skillId)
        })
        .catch((error) => {
            console.log(error);
        })
}

// getting user's data from the backend

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


</script>

<style scoped></style>