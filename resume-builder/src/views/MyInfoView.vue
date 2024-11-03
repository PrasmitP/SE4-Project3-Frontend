<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Information for {{ userName }}</h1>
                <v-form>
                    <v-card>
                        <v-card-title>
                            <h2>Basic Information</h2>
                        </v-card-title>
                        <v-text-field label="First Name *" type="text" required></v-text-field>
                        <v-text-field label="Last Name *" type="text" required></v-text-field>
                        <v-text-field label="City *" type="text" required></v-text-field>
                        <v-select label="State *" :items="states" required></v-select>
                        <v-text-field label="Phone Number *" type="phone-number" required></v-text-field>
                        <v-text-field label="Email *" type="email" required></v-text-field>
                        <v-text-field label="LinkedIn/Website" type="text"></v-text-field>
                        <v-card-title>
                            <h2>Professional Summary</h2>
                        </v-card-title>
                        <v-textarea label="Professional Summary *" required></v-textarea>
                        <v-card-title>
                            <h2>Education</h2>
                        </v-card-title>
                        <v-text-field label="University Name *" type="text" required></v-text-field>
                        <v-text-field label="City *" type="text" required></v-text-field>
                        <v-select label="State *" :items="statesShort" required></v-select>
                        <v-text-field label="Start Date *" type="month" required></v-text-field>
                        <v-text-field label="End Date *" type="month" required></v-text-field>
                        <v-text-field label="Degree *" type="text" required></v-text-field>
                        <v-text-field label="GPA *" type="number" required></v-text-field>
                        <v-text-field label="Awards" type="text"></v-text-field>
                        <v-text-field label="Coursework" type="text"></v-text-field>
                        <v-card-title>
                            <h2>Professional Experience</h2>
                        </v-card-title>
                        <v-text-field label="Company Name *" type="text" required></v-text-field>
                        <v-text-field label="Job Title *" type="text" required></v-text-field>
                        <v-text-field label="Start Date *" type="month" required></v-text-field>
                        <v-text-field label="End Date *" type="month" required></v-text-field>
                        <v-text-field label="City *" required></v-text-field>
                        <v-select label="State *" :items="statesShort" required></v-select>
                        <v-textarea label="Accomplishment "
                            placeholder="Accomplished {X} as measured by {Y}, by doing {Z} | Action + Project/Problem + Results = Accomplishment"></v-textarea>
                        <v-btn>+</v-btn>
                        <v-card-title>
                            <h2>Skills</h2>
                        </v-card-title>
                        <v-text-field label="Skill" type="text"></v-text-field>
                        <v-btn>+</v-btn>
                        <v-text-field label="Language"></v-text-field>
                        <v-select label="Proficiency Level" :items="proficiencyLevels"></v-select>
                        <v-btn>+</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn>Save</v-btn>
                    </v-card>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';

let userName = ref("John Smith");
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
</script>

<style scoped></style>