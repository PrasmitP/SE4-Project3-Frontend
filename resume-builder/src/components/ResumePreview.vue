<template>
    <div class="background">
        <div class="previewAndComment">
            <div class="resumePreview">
                <h1>This is where the resume preview will go</h1>
                <p>Resume preview will be displayed here either as an html or image/pdf</p>
            </div>
            <div class="comments">
                <v-icon @click="$emit('hidePreviewEmit')">mdi-fullscreen-exit</v-icon>
                <v-timeline side="end">
                    <v-timeline-item>
                        <template v-slot:icon>
                            <v-avatar color="red">
                                <span class="textHeadline">DN</span>
                            </v-avatar>
                        </template>
                        <v-card>
                            <v-card-title>David North</v-card-title>
                            <v-card-text>Good Resume!!</v-card-text>
                        </v-card>
                    </v-timeline-item>
                </v-timeline>
            </div>
        </div>
    </div>
</template>

<script setup>
let comments = ["good", "needs improvement"];
</script>

<style scoped>
.background {
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    position: absolute;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
}

.previewAndComment {
    display: flex;
    background-color: white;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}

.resumePreview {
    background-color: white;
    height: 100vh;
    width: 66.67vh;
    padding: 2%;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}

.comments {
    background-color: darkgrey;
    height: 100vh;
    width: 50vh;
    padding: 2%;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}

h1 {
    font-size: 30px;
    color: black;
}

p {
    font-size: 20px;
    color: black;
}
</style>