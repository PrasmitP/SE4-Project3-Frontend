<template>
    <v-container>
        <h1>Your Resumes</h1>
        <v-row>
            <!-- <Resume /> -->
             <Resume name="New Resume" />
            <Resume v-for = "resumeName in resumeNames" :key="resumeName" :name="resumeName" />
        </v-row>
    </v-container>
</template>
<script setup>
const resumeNames = ["MyResume1", "MyResume2", "MyResume3"];
</script>
<style scoped></style>