<template>
    <v-container>
        <ResumePreview v-if="showPreview" @hidePreviewEmit="showPreview = false" />
        <div class="text-h4" style="text-align: center;">Saved Resumes</div>
        <v-row justify="center">
            <Resume />
            <Resume v-for="resumeObject in resumeObjects" :resumeObject="resumeObject"
                @showPreviewEmit="showPreview = true" />
        </v-row>
    </v-container>
</template>
<script setup>
import { ref } from 'vue';
import Utils from '@/config/utils';
import resumeServices from '@/services/resumeServices';

let resumeObjects = ref([{ resumeName: "placeholder", exampleText: "this resume is not from the database" }])
let user = Utils.getStore("user");
if (user) {
    let userId = user.userId;
    resumeServices.getAllForUser(userId).then((res) => {
        res.data.forEach((item) => {
            let resume = { resumeName: item.title, exampleText: "this resume is from the database! although this text isnt" };
            resumeObjects.value.push(resume);
        });
        console.log(resumeObjects)
    });
}


let showPreview = ref(false);

</script>
<style scoped></style>