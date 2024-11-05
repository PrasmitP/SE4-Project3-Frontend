<template>
    <v-container>
      <h1>Your Resumes</h1>
      <v-btn text to="/build" class="no-highlight" @click="navigateToBuilder">
        New Resume
      </v-btn>
  
      <!-- Template selection -->
      <TemplateSwitcher @template-selected="onTemplateSelected" />
  
      <!-- Optional: Show selected template info if needed -->
      <div v-if="selectedTemplate">
        <p>Selected Template: {{ selectedTemplateName }}</p>
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
        selectedTemplate: null, // Track selected template ID
        selectedTemplateName: ''
      };
    },
    methods: {
      onTemplateSelected(templateId) {
        this.selectedTemplate = templateId;
        this.selectedTemplateName = this.getTemplateName(templateId);
      },
      getTemplateName(templateId) {
        const templates = {
          templateOne: 'Template One',
          templateTwo: 'Template Two',
          templateThree: 'Template Three',
          templateFour: 'Template Four'
        };
        return templates[templateId] || 'Default Template';
      },
      navigateToBuilder() {
        if (this.selectedTemplate) {
          this.$router.push({
            name: 'BuilderView', // Make sure BuilderView has this route name in your router config
            params: { templateId: this.selectedTemplate }
          });
        } else {
          alert("Please select a template before proceeding.");
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add custom styling if needed */
  .no-highlight {
    text-transform: none;
  }
  </style>
