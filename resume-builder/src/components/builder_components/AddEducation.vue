<template>
    <v-btn @click="() => showEducationAdd = true" color="button">Add Education</v-btn>
    <v-dialog v-model="showEducationAdd">
      <template v-slot:default="showEducationAdd">
        <v-card color="primary" max-width="80vw">
          <v-card-title>Add Education</v-card-title>
          <v-row>
            <v-col cols="4">
              <v-text-field label="University Name *" type="text" required v-model="education.institutionName"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field label="City *" type="text" required v-model="education.city"></v-text-field>
            </v-col>
            <v-col>
              <v-select label="State *" :items="statesShort" required v-model="education.state"></v-select>
            </v-col>
            <v-col>
              <v-text-field label="Start Date *" type="month" required v-model="education.startDate"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="End Date *" type="month" required v-model="education.endDate"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-text-field label="Degree *" type="text" required v-model="education.degree"></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field label="GPA *" type="number" required v-model="education.gpa"></v-text-field>
            </v-col>
          </v-row>
          <v-col>
            <v-text-field label="Awards" type="text" v-model="education.awards"></v-text-field>
          </v-col>
  
          <v-text-field label="Coursework" type="text" v-model="education.coursework"></v-text-field>
  
          <!-- Save Button -->
          <v-btn color="primary" @click="saveEducation">Save</v-btn>
        </v-card>
      </template>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import educationServices from '@/services/educationServices';

  let showEducationAdd = ref(false);
  const props = defineProps({
    userId: {
      type: String,
      required: true
    },
    educationList: {
      type: Array,
      required: true
    }
  });
  let educationList = props.educationList;
  let userId = props.userId;

  let education = ref({
    institutionName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    bachalorName: '',
    gpa: '',
    userId: userId,
  });
  
  let statesShort = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 
  'MD',  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 
  'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];
  
  const saveEducation = () => {
    console.log(education.value);
    educationServices.create(education.value).then((res) => {
      console.log(res);
      showEducationAdd.value = false;
      educationList.push(education.value);
    }).catch((err) => {
      console.log(err);
    });
  };
  </script>
  
  <style scoped>
  </style>