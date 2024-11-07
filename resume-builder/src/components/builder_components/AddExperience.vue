<template>
    <v-btn @click="() => showExperienceAdd = true" color="button">Add Experience</v-btn>
    <v-dialog v-model="showExperienceAdd">
        <template v-slot:default="showExperienceAdd">
            <v-card color="primary" max-width="80vw">
                <v-card-title>Add Experience</v-card-title>
                <v-text-field label="Company Name *" type="text" required></v-text-field>
                <v-row>
                    <v-col cols="4">
                        <v-text-field label="Job Title *" type="text" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field label="City *" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-select label="State *" :items="statesShort" required></v-select>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field label="Start Date *" type="month" required></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field label="End Date *" type="month" required></v-text-field>
                    </v-col>
                </v-row>
                <v-textarea label="Accomplishment "
                    placeholder="Accomplished {X} as measured by {Y}, by doing {Z} | Action + Project/Problem + Results = Accomplishment"></v-textarea>
                <v-btn>+</v-btn>
            </v-card>
        </template>
    </v-dialog>
</template>
<script setup>
import { ref } from 'vue';
let showExperienceAdd = ref(false);
</script>
<style scoped></style>