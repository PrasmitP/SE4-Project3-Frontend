<template>
    <v-btn @click="() => showSkillAdd = true" color="button">Add Skill</v-btn>
    <v-dialog v-model="showSkillAdd">
        <template v-slot:default="showSkillAdd">
            <v-container class="justify-center">
                <v-card color="primary" max-width="95vw">
                <v-card-title>Add Skill</v-card-title>
                    <v-radio-group v-model="inline" inline>
                        <v-radio label="Skill"></v-radio>
                        <v-radio label="Language"></v-radio>
                    </v-radio-group>
                    <v-text-field label="Skill" type="text"></v-text-field>
                    <v-text-field label="Language"></v-text-field>
                    <v-select label="Proficiency Level" :items="proficiencyLevels"></v-select>
                    <v-btn>+</v-btn>
                </v-card>
            </v-container>
        </template>
    </v-dialog>
</template>
<script setup>
import { ref } from 'vue';
let showSkillAdd = ref(false);


</script>
<style scoped></style>