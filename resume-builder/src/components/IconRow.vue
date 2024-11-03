<template>
    <v-row class="iconRow">
        <v-icon @click="goToBuild">mdi-pencil</v-icon>
        <v-icon @click="downloadPDF">mdi-download</v-icon>
        <v-icon @click="deleteResume">mdi-delete</v-icon>
    </v-row>
</template>

<script setup>
import { useRouter } from 'vue-router';

// I should probably have these in the services folder
const router = useRouter(); 
const goToBuild = () => {
    router.push('/build');
}

const deleteResume = () => {
    console.log("delete resume");
}

const downloadPDF = () => {
    console.log("download pdf");
}
</script>

<style scoped>
.iconRow {
    color: white;
    z-index: 1;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    scale: 0.75;
    margin: 0;
}
.v-icon {
    cursor: pointer;
    transition: transform 0.2s;
}

.v-icon:hover {
    transform: scale(1.2);
}
</style>