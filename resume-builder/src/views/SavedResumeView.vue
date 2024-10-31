<template>
    <v-container>
        <h1>Your resume has been saved</h1>
        <div class="resumePreview"></div>
        <h2>Ai Suggestions</h2>
        <p>ai suggestion text should go here</p>
        <v-btn>Edit</v-btn>
        <v-btn>Download PDF</v-btn>
    </v-container>
</template>
<script setup></script>
<style scoped>
.resumePreview{
    border: 1px solid black;
    background-color: white;
    height: 1000px;
    width: 800px;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>