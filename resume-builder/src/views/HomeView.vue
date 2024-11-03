<template>
    <v-container>
        <ResumePreview v-if="showPreview" @hidePreviewEmit="showPreview = false" />
        <h1>Your Resumes</h1>
        <v-row>

            <Resume />
            <Resume v-for="resumeObject in resumeObjects" :resumeObject="resumeObject"
                @showPreviewEmit="showPreview = true" />

            <!-- <Resume /> 
             <Resume name="New Resume" />
            <Resume v-for = "resumeName in resumeNames" :key="resumeName" :name="resumeName" /> -->
        </v-row>
    </v-container>
</template>
<script setup>
import { ref } from 'vue';

let showPreview = ref(false);

const resumeObjects = [
    { resumeName: "MyResume1", exampleText: "Example Text. This should have a preview of the resume" },
    { resumeName: "MyResume2", exampleText: "Resume can be stored either as image or html content" },
    { resumeName: "MyResume3", exampleText: "all resumes should have 4 options: edit, delete, download (pdf) and expanded preview" }];
</script>
<style scoped></style>