<template>
    <v-btn @click="() => showSkillAdd = true" color="button">Add Skill</v-btn>
    <v-dialog v-model="showSkillAdd">
        <template v-slot:default="showSkillAdd">
            <v-container class="justify-center">
                <v-card color="primary" max-width="95vw">
                    <v-card-title>Add Skill</v-card-title>
                    <v-radio-group v-model="skill.isLanguage" inline>
                        <v-radio label="Skill"></v-radio>
                        <v-radio label="Language"></v-radio>
                    </v-radio-group>
                    <v-text-field v-model="skill.title" label="Skill" type="text"></v-text-field>
                    <v-text-field v-model="skill.title" label="Language"></v-text-field>
                    <v-select v-model="skill.proficiencyLevel" label="Proficiency Level" :items="proficiencyLevels"></v-select>
                    <v-btn>+</v-btn>
                </v-card>
                <v-btn @click="saveSkill">Save</v-btn>
            </v-container>
        </template>
    </v-dialog>
</template>
<script setup>
import { ref } from 'vue';
import skillServices from '@/services/skillServices';

const proficiencyLevels = [
    "Beginner", "Intermediate", "Advanced", "Fluent", "Native"
];

let showSkillAdd = ref(false);
const props = defineProps({
    userId: {
        type: String,
        required: true
    },
    skillList: {
        type: Array,
        required: true
    }
});
let skillList = props.skillList;
let userId = props.userId;

let skill = ref({
    title: '',
    isLanguage: false,
    proficiencyLevel: '',
    userId: userId,
});

const saveSkill = () => {
    console.log(skill.value);
    skillServices.create(skill.value).then((res) => {
        console.log(res);
        skillList.push(skill.value);
        showSkillAdd.value = false;
    }).catch((err) => {
        console.log(err);
    });
};



</script>
<style scoped></style>