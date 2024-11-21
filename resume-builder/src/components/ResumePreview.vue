<template>
    <div class="background" @click="$emit('hidePreviewEmit')"></div>
    <v-row justify="center">
        <v-card class="card-container">
            <v-container style="display: inline-flex;">
                <v-card color="rgb(190,190,190)" width="66.67vh">
                    <v-card-title>This is where the resume preview will go</v-card-title>
                    <v-card-text>Resume preview will be displayed here either as an html or image/pdf</v-card-text>
                </v-card>
                <v-card width="60vh" >
                    <v-card height="50vh">
                        <v-card>
                            <v-row justify="end" no-gutters align="center">
                                <icon-row></icon-row>
                                <v-spacer></v-spacer>
                                <v-icon @click="$emit('hidePreviewEmit')" size="30px">
                                    mdi-fullscreen-exit</v-icon>
                            </v-row>
                        </v-card>
                        <v-timeline align="start" side="end" density="comfortable" line-thickness="0"
                            style="overflow-y: auto;">
                            <v-timeline-item v-for="comment in comments" key="comment.name">
                                <template v-slot:icon>
                                    <v-avatar color="red">
                                        <span>{{ comment.initials }}</span>
                                    </v-avatar>
                                </template>
                                <v-card color="white" max-width="95%" style="border-radius: 10px;">
                                    <v-card-title>{{ comment.name }}</v-card-title>
                                    <v-card-text>{{ comment.comment }}</v-card-text>
                                </v-card>
                            </v-timeline-item>
                            <div style="height: 40px;   "></div>
                        </v-timeline>
                    </v-card>
                    <v-card color="indigo" height="30vh">
                        <v-card color="indigo-darken-3">
                            <v-card-title>AI Suggestion</v-card-title>
                        </v-card>
                        <v-card-text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero repudiandae sit
                            sequi blanditiis soluta
                            odit ab quibusdam corrupti provident totam! Nulla laboriosam saepe quibusdam quas magnam
                            odit voluptate animi
                            deleniti.</v-card-text>
                    </v-card>
                </v-card>
            </v-container>
        </v-card>
    </v-row>
</template>

<script setup>
let comments = [
    {
        name: "David North",
        initials: "DN",
        comment: "Good Resume!!"
    },
    {
        name: "Jane Doe",
        initials: "JD",
        comment: "Change this!!"
    },
    {
        name: "John Smith",
        initials: "JS",
        comment: "Change that!!!"
    },
    {
        name: "Alice Wonderland",
        initials: "AW",
        comment: "Your resume has a few problems: 1. You have a typo in the second paragraph. 2. The font size is too small. 3. The layout is not very appealing. 4. You should add more bullet points to your work experience."
    },
    {
        name: "Bob Builder",
        initials: "BB",
        comment: "Your resume is great! I love the layout and the font. The only thing I would change is the color scheme. I think it would look better with a different color."
    },
    {
        name: "Charlie Chaplin",
        initials: "CC",
        comment: "Your resume is perfect! I wouldn't change a thing. Great job!"
    }

];
</script>

<style scoped>
.v-card {
    border-radius: 0%;
}
.background {
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
}

.card-container {
    z-index: 5;
    position: fixed;
    margin-top: 35px;
}

</style>