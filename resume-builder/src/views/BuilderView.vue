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

                    <v-card color="primary">
                        <v-card-title>
                            <h2>Education</h2>
                        </v-card-title>
                        <v-card color="transparent">
                            <v-row>
                                <v-col v-for="education in currentEducation" cols="6">
                                    <v-card>
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

                    <v-card color="secondary">
                        <v-card-title>
                            <h2>Professional Experience</h2>
                        </v-card-title>
                        <v-card color="transparent">
                            <v-row>
                                <v-col v-for="experience in currentExperience" cols="6">
                                    <v-card>
                                        <v-card-title>
                                            <h3>{{ experience.companyName }}</h3>
                                        </v-card-title>
                                        <v-card-text>
                                            <p>{{ experience.jobTitle }}</p>
                                            <p>{{ experience.city }}, {{ experience.state }}</p>
                                            <p>{{ experience.startDate }} - {{ experience.endDate }}</p>
                                            <p v-for="accomplishment in experience.accomplishments">{{ accomplishment }}
                                            </p>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <add-experience />
                        </v-card>
                    </v-card>

                    <v-card color="primary">
                        <v-card-title>
                            <h2>Skills</h2>
                        </v-card-title>
                        <v-row>
                            <v-col v-for="skill in currentSkills" cols="2">
                                <v-card>
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
                </v-form>
            </v-col>
            <v-btn to="build/saved">Generate Resume</v-btn>
        </v-container>
</template>

<script setup>
import { ref } from 'vue';
let resumeName = ref("");

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

let currentEducation = ref([
    {
        universityName: "Oklahoma Christian University",
        city: "Edmond",
        state: "OK",
        startDate: "8/2021",
        endDate: "4/2025",
        degree: "Bachelor of Science in Computer Science",
        gpa: 3.5,
        awards: "",
        coursework: ""
    },
    {
        universityName: "Harrisburg University of Science and Technology",
        city: "Harrisburg",
        state: "PA",
        startDate: "8/2016",
        endDate: "4/2021",
        degree: "DegreeHere",
        gpa: 2.0,
        awards: "",
        coursework: ""
    },
    {
        universityName: "University of Oklahoma",
        city: "Norman",
        state: "OK",
        startDate: "8/2015",
        endDate: "4/2019",
        degree: "DegreeHere",
        gpa: 3.0,
        awards: "",
        coursework: ""
    }
])

let currentExperience = ref([
    {
        companyName: "Company Name",
        jobTitle: "Job Title",
        startDate: "8/2021",
        endDate: "4/2025",
        city: "City",
        state: "State",
        accomplishments: [
            "Accomplished {X} as measured by {Y}, by doing {Z} | Action + Project/Problem + Results = Accomplishment"
        ]
    },
    {
        companyName: "Company Name",
        jobTitle: "Job Title",
        startDate: "8/2021",
        endDate: "4/2025",
        city: "City",
        state: "State",
        accomplishments: [
            "Accomplished {X} as measured by {Y}, by doing {Z} | Action + Project/Problem + Results = Accomplishment"
        ]
    },
    {
        companyName: "Company Name",
        jobTitle: "Job Title",
        startDate: "8/2021",
        endDate: "4/2025",
        city: "City",
        state: "State",
        accomplishments: [
            "Accomplished {X} as measured by {Y}, by doing {Z} | Action + Project/Problem + Results = Accomplishment"
        ]
    }
])

let currentSkills = ref([
    {
        type: "Skill",
        skill: "Python",
    },
    {
        type: "Skill",
        skill: "Java",
    },
    {
        type: "Skill",
        skill: "C++",
    },
    {
        type: "Skill",
        skill: "JavaScript",
    },
    {
        type: "Language",
        skill: "Spanish",
        proficiency: "Fluent"
    },
    {
        type: "Language",
        skill: "English",
        proficiency: "Native"   
    },
    {
        type: "Language",
        skill: "French",
        proficiency: "Beginner"
    }
])

const proficiencyLevels = [
    "Beginner", "Intermediate", "Advanced", "Fluent", "Native"
];

</script>

<style scoped></style>