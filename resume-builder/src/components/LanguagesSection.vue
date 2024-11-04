<!-- LanguagesSection.vue -->
<template>
    <div>
      <h2>Languages</h2>
      <div v-for="(language, index) in languages" :key="index" class="language-entry">
        <v-text-field
          :value="language"
          label="Language"
          @input="updateLanguage(index, $event)"
        ></v-text-field>
        <v-btn icon @click="removeLanguage(index)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
      <v-btn @click="addLanguage">Add Language</v-btn>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        languages: [''] // Initialize with one empty language
      };
    },
    methods: {
      updateLanguage(index, value) {
        this.languages[index] = value;
      },
      addLanguage() {
        this.languages.push('');
      },
      removeLanguage(index) {
        this.languages.splice(index, 1);
      },
    },
  };
  </script>
  
  <style scoped>
  .language-entry {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  </style>