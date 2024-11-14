<template>
    <v-btn @click="() => showEducationAdd = true" color="button">Add Education</v-btn>
    <v-dialog v-model="showEducationAdd">
        <template v-slot:default="showEducationAdd">
            <v-card color="primary" max-width="80vw">
                <v-card-title>Add Education</v-card-title>
                <v-row>
                    <v-col cols="4">
                        <v-text-field label="University Name *" type="text" required></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field label="City *" type="text" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-select label="State *" :items="statesShort" required></v-select>
                    </v-col>
                    <v-col>
                        <v-text-field label="Start Date *" type="month" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field label="End Date *" type="month" required></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4">
                        <v-text-field label="Degree *" type="text" required></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field label="GPA *" type="number" required></v-text-field>
                    </v-col>
                </v-row>
                <!-- think about how to implement these -->
                <v-text-field label="Awards" type="text"></v-text-field>
                <v-text-field label="Coursework" type="text"></v-text-field>
            </v-card>
        </template>
    </v-dialog>
</template>
<script setup>
import { ref } from 'vue';
let showEducationAdd = ref(false);
</script>
<style scoped></style>