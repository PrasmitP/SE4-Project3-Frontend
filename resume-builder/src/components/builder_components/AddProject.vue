<template>
    <v-btn @click="() => showProjectAdd = true" color="button">Add Project</v-btn>
    <v-dialog v-model="showProjectAdd">
        <template v-slot:default="showProjectAdd">
            <v-container class="justify-center">
                <v-card color="primary" max-width="95vw">
                    <v-card-title>Add Project</v-card-title>
                    <v-text-field v-model="project.projectName" label="Project Name *" type="text" required></v-text-field>
                    <v-row>
                        <v-col cols="2">
                            <v-text-field v-model="project.startDate" label="Start Date *" type="month" required></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-text-field v-model="project.endDate" label="End Date *" type="month" required></v-text-field>
                        </v-col>
                    </v-row>
                </v-card>
                <v-btn @click="saveProject">Save</v-btn>
            </v-container>
        </template>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import projectServices from '@/services/projectServices';

let showProjectAdd = ref(false);
const props = defineProps({
    userId: {
        type: String,
        required: true
    },
    projectList: {
        type: Array,
        required: true
    }
});
let projectList = props.projectList;
let userId = props.userId;

let project = ref({
    projectName: '',
    startDate: '',
    endDate: '',
    userId: userId,
});

const saveProject = () => {
    console.log(project.value);
    projectServices.create(project.value).then((res) => {
        console.log(res);
        projectList.push(project.value);
        showProjectAdd.value = false;
    }).catch((err) => {
        console.log(err);
    });
};

</script>
<style scoped></style>