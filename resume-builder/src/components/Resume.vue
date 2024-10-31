<template>
    <div class="wrapper" @mouseover="showIconRow=true" @mouseout="showIconRow=false">
        <IconRow :style="{
            visibility: showIconRow && !newResumeBool ? 'visible' : 'hidden',
        }"/>
        <div class="resumePreview" v-if="props.resumeObject" @click="$emit('showPreviewEmit')">
            <div>
                <p class="textInside">{{ props.resumeObject.exampleText }}</p>
            </div>
        </div>
        <div class="resumePreview" v-else @click="goToBuild">
            <div class="circle">
                <v-icon class="plusSign">mdi-plus</v-icon>
            </div>
        </div>
        <p>{{ resumeName }}</p>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const props = defineProps({
    resumeObject: {
        type: Object,
    }
});

let previewResume = ref(false);
let newResumeBool = props.resumeObject ? false : true;
let resumeName = newResumeBool ? "New Resume" : props.resumeObject.resumeName;
let showIconRow = ref(false);

const router = useRouter();
const goToBuild = () => {
    router.push('/build');
}
</script>

<style scoped>
p {
    text-align: center;
    font-size: 12px;
}

.textInside {
    font-size: 12px;
    color: black;
}

.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin:  3px;
    width: fit-content;
}
.resumePreview {
    width: 90px;
    height: 160px;
    background-color: lightgrey;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.resumePreview:hover .circle {
    transform: scale(1.1);
}

.resumePreview:hover .plusSign {
    transform: scale(1.1);
}

.plusSign {
    font-size: 48px;
    color: black;
    transition: transform 0.3s;
}

.circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
}
</style>
