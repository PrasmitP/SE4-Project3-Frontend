<!-- TemplateSwitcher.vue -->
<template>
    <v-row class="template-row" justify="center">
      <v-col cols="3" v-for="template in templates" :key="template.id" class="template-box">
        <v-card outlined @click="selectTemplate(template.id)" class="template-card">
          <v-card-title class="d-flex justify-center">
            <v-icon large>mdi-plus</v-icon>
          </v-card-title>
          <v-card-subtitle class="text-center">{{ template.name }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </template>
  
  <script>
  export default {
    data() {
      return {
        templates: [
          { id: 'templateOne', name: 'Template One' },
          { id: 'templateTwo', name: 'Template Two' },
          { id: 'templateThree', name: 'Template Three' },
          { id: 'templateFour', name: 'Template Four' },
        ],
      };
    },
    methods: {
      selectTemplate(templateId) {
        this.$emit('template-selected', templateId);
      },
    },
  };
  </script>
  
  <style scoped>
  .template-row {
    margin-top: 20px;
  }
  .template-box {
    text-align: center;
  }
  .template-card {
    cursor: pointer;
    transition: transform 0.2s;
  }
  .template-card:hover {
    transform: scale(1.05);
  }
  </style>