<template>
    <v-container>
      <v-row>
        <v-col>
          <h1>New Resume - {{ selectedTemplateName }}</h1>
  
          <TemplateSwitcher @template-selected="onTemplateSelected" />
  
          <v-text-field label="File Name" type="text"></v-text-field>
          <v-form>
            <v-text-field label="First Name" type="text" v-if="showField('firstName')"></v-text-field>
            <v-text-field label="Last Name" type="text" v-if="showField('lastName')"></v-text-field>
            <v-text-field label="City" type="text" v-if="showField('city')"></v-text-field>
            <v-select :items="states" label="State" v-if="showField('state')"></v-select>
            <v-text-field label="Phone Number" type="tel" v-if="showField('phoneNumber')"></v-text-field>
            <v-text-field label="Email" type="email" v-if="showField('email')"></v-text-field>
            <v-text-field label="LinkedIn or Website URL" type="url" v-if="showField('linkedinOrWebsite')"></v-text-field>
            <v-textarea label="Professional Summary" v-if="showField('professionalSummary')"></v-textarea>
  
            <div v-if="showField('education')">
              <h2>Education</h2>
              <v-text-field label="University Name" type="text"></v-text-field>
              <v-text-field label="City" type="text"></v-text-field>
              <v-select :items="states" label="State"></v-select>
              <v-select :items="months" label="Start Month"></v-select>
              <v-select :items="years" label="Start Year"></v-select>
              <v-select :items="months" label="Projected Graduation Month"></v-select>
              <v-select :items="years" label="Projected Graduation Year"></v-select>
              <v-text-field label="Degree Title" type="text"></v-text-field>
              <v-text-field label="GPA (0.0-4.0)" type="number" v-model="gpa"></v-text-field>
              <v-text-field label="Awards (optional)" type="text" v-if="showField('awards')"></v-text-field>
              <v-text-field label="Relevant Coursework (optional)" type="text" v-if="showField('coursework')"></v-text-field>
              <v-checkbox label="150 Hours (Accounting)" v-if="selectedTemplate === 'templateOne'"></v-checkbox>
            </div>
  
            <div v-if="showField('professionalExperience')">
              <h2>Professional Experience</h2>
              <v-text-field label="Employer" type="text"></v-text-field>
              <v-text-field label="Title" type="text"></v-text-field>
              <v-text-field label="City" type="text"></v-text-field>
              <v-select :items="states" label="State"></v-select>
              <v-select :items="months" label="Start Month"></v-select>
              <v-select :items="years" label="Start Year"></v-select>
              <v-select :items="months" label="End Month"></v-select>
              <v-select :items="years" label="End Year"></v-select>
              <v-checkbox label="Present"></v-checkbox>
  
              <div v-for="n in 4" :key="n">
                <v-text-field label="Bullet Point" type="text" v-if="n <= 3 || showField('optionalBulletPoint')"></v-text-field>
              </div>
            </div>
  
            <!-- Skills Section -->
            <div v-if="showField('skills')">
              <h2>Skills</h2>
              <v-select label="Skill Type" :items="['Hard Skills', 'Computer Skills']"></v-select>
              <v-text-field v-model="skills[index]" label="Skill" v-for="(skill, index) in skills" :key="index"></v-text-field>
              <v-btn @click="addSkill">Add Skill</v-btn>
              <h2>Language Skills</h2>
              <v-text-field label="Language" v-for="(language, index) in languages" :key="index"></v-text-field>
              <v-select :items="proficiencyLevels" label="Proficiency" v-for="(language, index) in languages" :key="index"></v-select>
              <v-btn @click="addLanguage">Add Language</v-btn>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import TemplateSwitcher from "@/components/TemplateSwitcher.vue";
  
  export default {
    components: {
      TemplateSwitcher,
    },
    data() {
      return {
        selectedTemplate: null,
        selectedTemplateName: "",
        skills: [""],
        languages: [""],
        gpa: 0.0,
        states: [
          "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", 
        ],
        months: ["January", "February", "March","April", "May", "June", "July", "Aug", "Sept","Oct","Nov","Dec" ],
        years: Array.from({ length: 35 }, (_, i) => 1990 + i),
        proficiencyLevels: ["Beginner", "Intermediate", "Advanced", "Fluent", "Native"],
      };
    },
    methods: {
      onTemplateSelected(templateId) {
        this.selectedTemplate = templateId;
        this.selectedTemplateName = this.getTemplateName(templateId);
      },
      getTemplateName(templateId) {
        const templates = {
          templateOne: "Template One",
          templateTwo: "Template Two",
          templateThree: "Template Three",
          templateFour: "Template Four",
        };
        return templates[templateId] || "Default Template";
      },
      showField(field) {
        const templateFields = {
          templateOne: [
            "firstName", "lastName", "city", "state", "phoneNumber", "email", "linkedinOrWebsite", "professionalSummary",
            "education", "professionalExperience", "skills", "optionalBulletPoint",
          ],
          templateTwo: [
            "firstName", "lastName", "city", "state", "phoneNumber", "email", "linkedinOrWebsite", "professionalSummary",
            "education", "professionalExperience", "skills",
          ],
          templateThree: [
            "firstName", "lastName", "city", "state", "phoneNumber", "email", "linkedinOrWebsite", "objective",
            "education", "leadershipExperience", "skills",
          ],
          templateFour: [
            "firstName", "lastName", "city", "state", "phoneNumber", "email", "linkedinOrWebsite", "professionalSummary",
            "education", "experience", "projects", "skills",
          ],
        };
        return templateFields[this.selectedTemplate]?.includes(field);
      },
      addSkill() {
        this.skills.push("");
      },
      addLanguage() {
        this.languages.push("");
      },
    },
  };
  </script>
  
  <style scoped>
  .skill-entry {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }
  </style>