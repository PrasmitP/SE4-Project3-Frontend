<template>
    <div class="iconRow">
        <v-icon @click="goToBuild">mdi-pencil</v-icon>
        <v-icon @click="downloadPDF">mdi-download</v-icon>
        <v-icon @click="deleteResume">mdi-delete</v-icon>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';
import { generatePDF } from './PDFDownloader.vue';

const props = defineProps({
    size: {
        type: String,
        optional: true
    },
    resumeObject: {
        type: Object,
        default: () => ({})
    },
    resumeName: {
        type: String,
        default: 'New Resume'
    }
});

const router = useRouter(); 
const goToBuild = () => {
    router.push('/build');
}

const deleteResume = () => {
    console.log("delete resume");
}

const downloadPDF = () => {
    generatePDF(props.resumeObject, props.resumeName);
}
</script>

<style scoped>
.iconRow {
    color: white;
    z-index: 1;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    scale: 0.75;
}
.v-icon {
    cursor: pointer;
    transition: transform 0.2s;
}

.v-icon:hover {
    transform: scale(1.2);
}
</style>