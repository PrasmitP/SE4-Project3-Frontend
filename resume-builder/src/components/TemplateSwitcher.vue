<template>
    <div class="template-switcher">
      <label for="templateSelect">Select Resume Template:</label>
      <select id="templateSelect" v-model="selectedTemplate" @change="switchTemplate" class="template-select">
        <option disabled value="">Select a template</option> 
        <option v-for="template in templates" :key="template.id" :value="template.id">
          {{ template.name }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedTemplate: null,
        templates: [
          { id: 'templateOne', name: 'Resume 1' },
          { id: 'templateTwo', name: 'Resume 2' },
          { id: 'templateThree', name: 'Resume 3' },
          { id: 'templateFour', name: 'Resume 4' }
        ]
      };
    },
    methods: {
      switchTemplate() {
        console.log("Selected template:", this.selectedTemplate);
        this.$emit('template-selected', this.selectedTemplate);
      }
    }
  };
  </script>
  
  <style scoped>
  .template-switcher {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .template-select {
    background-color: #ffffff; 
    color: #333;              
    padding: 8px 12px;       
    border: 1px solid #ccc;  
    border-radius: 4px;      
    transition: border-color 0.2s; 
  }
  
  .template-select:focus {
    border-color: #007BFF; 
    outline: none;         
  }
  </style>