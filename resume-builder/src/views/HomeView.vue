<template>
    <v-container>
      <h1>Your Resumes</h1>
      <v-btn text to="/build" class="no-highlight">New Resume</v-btn>
  
      <TemplateSwitcher @template-selected="onTemplateSelected" />
  
      <div v-if="selectedTemplate">
        <p>Selected Template: {{ selectedTemplate }}</p>
      </div>
    </v-container>
  </template>
  
  <script>
  import TemplateSwitcher from '@/components/TemplateSwitcher.vue';
  
  export default {
    components: {
      TemplateSwitcher
    },
    data() {
      return {
        selectedTemplate: null 
      };
    },
    methods: {
      onTemplateSelected(templateId) {
        this.selectedTemplate = templateId;
        console.log(`Template selected: ${templateId}`);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Adding styling */
  </style>