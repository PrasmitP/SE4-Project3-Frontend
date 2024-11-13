<template>
    <v-container>
        <v-card width="40vw" color="transparent">
            <v-row>
                <v-col v-for="template in templates" :key="template.id" cols="3">
                    <v-card class="resumePreview">
                    </v-card>
                    <v-card variant="plain">
                        <v-card-title class="font-weight-light">
                            {{ template.name }}
                        </v-card-title>
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <v-radio-group v-model="selectedTemplate">
                                <v-radio :value="template.id"></v-radio>
                            </v-radio-group>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>

    </v-container>
</template>

<script setup>
import { ref } from 'vue';

const templates = [
    {
        id: 1,
        name: 'Template 1',
        // preview: 'template1.png'
    },
    {
        id: 2,
        name: 'Template 2',
        // preview: 'template2.png'
    },
    {
        id: 3,
        name: 'Template 3',
        // preview: 'template3.png'
    }
    ,
    {
        id: 4,
        name: 'Template 4',
        // preview: 'template4.png'
    }
]

const selectedTemplate = ref(null);
</script>

<style scoped>
.resumePreview {
    width: 135px;
    height: 240px;
    background-color: lightgrey;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
</style>
