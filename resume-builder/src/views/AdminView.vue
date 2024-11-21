<template>
    <v-container v-if="isAdmin==true">
        <ResumePreview :resumeId="currentResumeId" isAdmin="true" v-if="showPreview" @hidePreviewEmit="showPreview = false" />
        <div class="text-h4" style="text-align: center;">Admin View</div>
        <v-row justify="center">
            <Resume v-for="resumeObject in resumeObjects" :resumeObject="resumeObject"
                @showPreviewEmit="showPreviewFunction" />
        </v-row>
    </v-container>
    <v-alert color="red" v-else title="Insufficient Permission" text="You cannot view this page because you are not an Admin... Paypal $20 to david.reis@hotmail.com to become one!"></v-alert>
</template>
<script setup>
import { ref } from 'vue';
import Utils from '@/config/utils';
import resumeServices from '@/services/resumeServices';
import userServices from '@/services/userServices';

let resumeObjects = ref([])
let user = Utils.getStore("user");
let isAdmin = ref(false)
// Getting user from the backend
userServices.getUserForId(user.userId).then((res) => {
    user = res.data;
    isAdmin.value = user.isAdmin;
    console.log(user)
    getResumes();
}).catch((err) => {
    console.log(err)
});

function getResumes() {
    let userId = user.userId;
    resumeServices.getAll().then((res) => {
        res.data.forEach((item) => {
            let resume = item
            resumeObjects.value.push(resume);
        });
        console.log("resumes:")
        console.log(resumeObjects)
    });
}

let showPreview = ref(false);
let currentResumeId = ref(0);
function showPreviewFunction (resumeId) {
    currentResumeId.value = resumeId;
    console.log("showing preview for resumeId:" + currentResumeId.value)
    showPreview.value = true;
}
</script>
<style scoped></style>