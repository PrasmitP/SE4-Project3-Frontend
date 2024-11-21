<template>
    <v-btn @click="() => showExperienceAdd = true" color="button">Add Experience</v-btn>
    <v-dialog v-model="showExperienceAdd">
        <template v-slot:default="showExperienceAdd">
            <v-container class="justify-center">
                <v-card color="primary" max-width="95vw">
                    <v-card-title>Add Experience</v-card-title>
                    <v-text-field v-model="experience.companyName" label="Company Name *" type="text" required></v-text-field>
                    <v-row>
                        <v-col cols="4">
                            <v-text-field v-model="experience.jobRole" label="Job Title *" type="text" required></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field v-model="experience.city" label="City *" required></v-text-field>
                        </v-col>
                        <v-col>
                            <v-select v-model="experience.state" label="State *" :items="statesShort" required></v-select>
                        </v-col>
                        <v-col cols="2">
                            <v-text-field v-model="experience.startDate" label="Start Date *" type="month" required></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-text-field v-model="experience.endDate" label="End Date *" type="month" required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-textarea label="Accomplishment "
                        placeholder="Accomplished {X} as measured by {Y}, by doing {Z} | Action + Project/Problem + Results = Accomplishment"></v-textarea>
                    <v-btn>+</v-btn>
                    <!-- Save Button -->
                    <v-btn color="primary" @click="saveExperience">Save</v-btn>
                </v-card>
            </v-container>
        </template>
    </v-dialog>
</template>
<script setup>
import { ref } from 'vue';
import experienceServices from '@/services/experienceServices';

let statesShort = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
    'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA',
    'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

let showExperienceAdd = ref(false);
const props = defineProps({
    userId: {
        type: String,
        required: true
    },
    experienceList: {
        type: Array,
        required: true
    }
});

let experienceList = props.experienceList;
let userId = props.userId;

let experience = ref({
    companyName: '',
    jobRole: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    userId: userId,
});

const saveExperience = () => {
    console.log(experience.value);
    experienceServices.create(experience.value).then((res) => {
        console.log(res);
        showExperienceAdd.value = false;
        experienceList.push(experience.value);
    }).catch((err) => {
        console.log(err);
    });
};

</script>
<style scoped></style>