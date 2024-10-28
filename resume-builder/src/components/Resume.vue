<template>
    <div class="wrapper">
        <div class="resumePreview" @click="goToBuild">
            <div v-if="name === 'New Resume'" class="circle">
                <div class="plusSign">+</div>
            </div>
        </div>
        <p>{{ resumeName }}</p>

        <!--Download PDF Button-->
        <v-btn v-if="name !== 'New Resume'" color="primary" @click="generatePDF">Download Resume as PDF</v-btn>
    </div>
</template>

<script setup>
// Import for PDF
import { jsPDF } from 'jspdf';

import { useRouter } from 'vue-router';

const props = defineProps({
    name: {
        type: String,
        default: "New Resume"
    }
});

let resumeName = props.name; 

const router = useRouter();
const goToBuild = () => {
    router.push('/build');
}

// Function for PDF
const generatePDF = () => {
    const doc = new jsPDF();

    // Add Content
    doc.setFontSize(12);
    doc.text("Resume Name: {resumeName}", 10, 10);
    doc.text("Input resume content here...",10, 20);

    // Save/Download
    const fileName = resumeName || "New Resume";
    doc.save('${fileName}.pdf');
}
</script>

<style scoped>
p {
    text-align: center;
    font-size: 12px;
}

.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
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