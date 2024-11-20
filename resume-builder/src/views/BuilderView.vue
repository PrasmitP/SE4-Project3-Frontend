<template>
    <v-container>
        <v-col>
            <v-row justify="center">
                <v-card style="font-size: 30px; margin-bottom: 10px;">
                    <span class="font-weight-light">{{ resumeData.title }}</span>
                </v-card>
            </v-row>
            <v-text-field label="File Name" type="text" v-model="resumeData.title" class="mb-3"></v-text-field>

            <!-- Template Picker -->
            <v-row justify="center" class="mb-4">
                <v-card color="transparent">
                    <template-picker @template-selected="(id) => selectedTemplate = id" />
                </v-card>
            </v-row>

            <v-form>
                <!-- Basic Information Section -->
                <v-card color="secondary" class="mb-4">
                    <v-card-title>
                        <h2>Basic Information</h2>
                    </v-card-title>

                    <v-card color="transparent" class="mb-3">
                        <v-card-title>
                            <h3>Name and City</h3>
                        </v-card-title>
                        <v-row>
                            <v-col>
                                <v-text-field label="First Name *" type="text" required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field label="Last Name *" type="text" required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field label="City *" type="text" required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-select label="State *" :items="states" required></v-select>
                            </v-col>
                        </v-row>
                    </v-card>

                    <v-card color="transparent" class="mb-3">
                        <v-card-title>
                            <h3>Contact and Links</h3>
                        </v-card-title>
                        <v-row>
                            <v-col>
                                <v-text-field label="Phone Number *" type="phone-number" required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field label="Email *" type="email" required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field label="LinkedIn/Website" type="text"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card>

                    <v-card-title>
                        <h3>Professional Summary</h3>
                    </v-card-title>
                    <v-textarea v-model="resumeData.summary" :label="selectedTemplate == 3 ? 'Professional Summary *' : 'Career Objective *'" required class="mb-3"></v-textarea>
                </v-card>


                <!-- Education Section -->
                <v-card color="primary" class="mb-4">

                    <v-card-title>
                        <h2>Education</h2>
                    </v-card-title>

                    <v-card color="transparent" class="mb-3">
                        <v-row>
                            <v-col v-for="education in currentEducations" cols="6">

                                <v-card
                                    class="mb-2"
                                    :class="{ 'selected-card': selectedEducationId === education.educationId }"
                                    @click="educationDialog(education)">   
                                    <v-card-title>
                                        <h3>{{ education.institutionName }}</h3>
                                    </v-card-title>
                                    <v-card-text>
                                        <p>{{ education.degree || education.bachalorName }}</p>
                                        <p>{{ education.city }}, {{ education.state }}</p>
                                        <p>{{ education.startDate }} - {{ education.endDate }}</p>
                                        <p>GPA: {{ education.gpa }}</p>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>

                        <add-education 
                            :userId="userId" 
                            :educationList="currentEducations" 
                            mode="add" 
                            @refresh-data="refreshEducationData"
                        />
                        <add-education
                            v-if="selectedEducationId"
                            ref="editEducationRef"
                            :userId="userId"
                            :educationList="currentEducations"
                            mode="edit"
                            :educationToEdit="selectedEducation"
                            @refresh-data="refreshEducationData"
                        />
                        <v-btn
                            v-if="selectedEducationId"
                            class="mt-0"
                            color="red"
                            @click="deleteSelectedEducation"
                        >
                            Delete Education
                        </v-btn>
                    </v-card>
                </v-card>

                <!-- Professional Experience Section -->
                <v-card color="secondary" class="mb-4">
                    <v-card-title>
                        <h2>Professional Experience</h2>
                    </v-card-title>

                    <v-card color="transparent" class="mb-3">
                        <v-row>
                            <v-col v-for="experience in currentExperiences" cols="6">
                                <v-btn @click="editExperience">Edit</v-btn>
                                <v-btn @click="deleteExperience(experience.experienceId)">Delete</v-btn>
                                <v-card class="mb-2">
                                    <v-card-title>
                                        <h3>{{ experience.companyName }}</h3>
                                    </v-card-title>
                                    <v-card-text>
                                        <p>{{ experience.jobRole }}</p>
                                        <p>{{ experience.city }}, {{ experience.state }}</p>
                                        <p>{{ experience.startDate }} - {{ experience.endDate }}</p>
                                        <p v-for="accomplishment in experience.accomplishments" :key="accomplishment">{{
                                            accomplishment }}</p>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                        <add-experience :userId="userId" :experienceList="currentExperiences" />
                    </v-card>
                </v-card>

                <!-- Conditional Sections for Template 1, 3, and 4 -->

                <!-- Template 1 & 3: Skills Section -->
                <v-card color="primary" v-if="selectedTemplate === 1 || selectedTemplate === 3" class="mb-4">
                    <v-card-title>
                        <h2>Skills</h2>
                    </v-card-title>
                    <v-row>
                        <v-col v-for="skill in currentSkills" cols="2">
                            <v-card class="mb-2">
                                <v-btn @click="editSkill">Edit</v-btn>
                                <v-btn @click="deleteSkill(skill.skillId)">Delete</v-btn>
                                <v-card-text v-if="skill.type == 'Language'">
                                    <h3>{{ skill.title }} - {{ skill.proficiency }}</h3>
                                </v-card-text>
                                <v-card-title v-else>
                                    <h3>{{ skill.title }}</h3>
                                </v-card-title>
                            </v-card>
                        </v-col>
                    </v-row>
                    <add-skill :userId="userId" :skillList="currentSkills" />
                </v-card>

                <!-- Template 3: Honors & Awards Section -->
                <v-card color="primary" v-if="selectedTemplate === 3" class="mb-4">
                    <v-card-title>
                        <h2>Honors & Awards</h2>
                    </v-card-title>
                    <v-row>
                        <!-- Add Award Fields here -->
                    </v-row>
                    <add-award />
                </v-card>

                <!-- Template 4: Skills Section (Computer Skills only) -->
                <v-card color="primary" v-if="selectedTemplate === 4" class="mb-4">
                    <v-card-title>
                        <h2>Computer Skills</h2>
                    </v-card-title>
                    <v-row>
                        <v-col v-for="skill in currentSkills" :key="skill.skill" cols="2">
                            <v-card class="mb-2">
                                <v-card-title>
                                    <h3>{{ skill.skill }}</h3>
                                </v-card-title>
                            </v-card>
                        </v-col>
                    </v-row>
                    <add-skill />
                </v-card>

                <!-- Template 4: Projects Section -->
                <v-card color="primary" v-if="selectedTemplate === 4" class="mb-4">
                    <v-card-title>
                        <h2>Projects</h2>
                    </v-card-title>
                    <v-row>
                        <v-col v-for="project in currentProjects" cols="2">
                            <v-btn @click="editProject">Edit</v-btn>
                                <v-btn @click="deleteProject(project.projectId)">Delete</v-btn>
                                <v-card class="mb-2">
                                    <v-card-title>
                                        <h3>{{ project.projectName }}</h3>
                                    </v-card-title>
                                    <v-card-text>
                                        <p>{{ project.startDate }}</p>
                                        <p>{{ project.endDate }}</p>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                        <add-project :userId="userId" :projectList="currentProject" />
                    </v-card>

                <!-- Template 1: Accounting Hours Section -->
                <v-card color="primary" v-if="selectedTemplate === 1" class="mb-4">
                    <v-card-title>
                        <h2>Accounting Hours</h2>
                    </v-card-title>
                    <v-row>
                        <!-- Add Accounting Hours fields here -->
                    </v-row>
                    <add-accounting-hours />
                </v-card>
            </v-form>
        </v-col>
        <v-btn class="mt-4" @click="saveResume">Generate Resume</v-btn>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';

import TemplatePicker from '../components/TemplatePicker.vue';
import Utils from '@/config/utils';
import resumeServices from '@/services/resumeServices';
import educationServices from '@/services/educationServices';
import experienceServices from '@/services/experienceServices';
import skillServices from '@/services/skillServices';
import projectServices from '@/services/projectServices';
import { useRouter } from 'vue-router';

// creating important variables for the page

let props = defineProps({
    id: {
        type: Number,
    }
})
console.log("resume id:" + props.id)

let selectedTemplate = ref(1);
let user = Utils.getStore("user");
let userId = user.userId;
let resumeData = ref({
    title: "newResume",
    template: "",
    summary: "",
    userId: user.userId,
})

// start of constant for data editing

const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida",
    "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
    "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska",
    "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
    "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
    "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

// start of lists of data for resume

let currentEducations = ref([])
let currentExperiences = ref([])
let currentSkills = ref([])
let currentProjects = ref([])

// functions that send requests to backend
let router = useRouter();

let saveResume = () => {
    resumeData.value.template = selectedTemplate.value;
    console.log(selectedTemplate.value);
    resumeServices.create(resumeData.value)
        .then((response) => {
            console.log(response);
            router.push("/build/saved");
        })
        .catch((error) => {
            console.log(error);
        })
}


let selectedEducationId = ref(null);
let selectedEducation = ref(null);
const editEducationRef = ref(null);

let educationDialog = (education) => {

  if (selectedEducationId.value === education.educationId) {
    selectedEducationId.value = null;
    selectedEducation.value = null;
  } else {
    selectedEducationId.value = education.educationId;
    selectedEducation.value = education;
    editEducationRef.value.openDialog();
  }
};

let deleteSelectedEducation = () => {
  if (selectedEducationId.value) {
    educationServices.delete(selectedEducationId.value)
      .then((response) => {
        console.log("Education deleted:", response);
        refreshEducationData();
        selectedEducationId.value = null;
        selectedEducation.value = null;
      })
      .catch((error) => {
        console.error("Error deleting education:", error);
      });
  } else {
    console.warn("No education selected for deletion.");
  }
};

let refreshEducationData = () => {
  educationServices.getAllForUser(userId)
    .then((res) => {
      currentEducations.value = res.data;
      console.log("Education data refreshed:", currentEducations.value);
    })
    .catch((err) => {
      console.error("Error refreshing education data:", err);
    });
};

let deleteExperience = (experienceId) => {
    experienceServices.delete(experienceId)
        .then((response) => {
            console.log(response);
            currentExperiences.value = currentExperiences.value.filter(experience => experience.experienceId !== experienceId)
        })
        .catch((error) => {
            console.log(error);
        })
}
let deleteSkill = (skillId) => {
    skillServices.delete(skillId)
        .then((response) => {
            console.log(response);
            currentSkills.value = currentSkills.value.filter(skill => skill.skillId !== skillId)
        })
        .catch((error) => {
            console.log(error);
        })
}
let deleteProject = (projectId) => {
    projectServices.delete(projectId)
        .then((response) => {
            console.log(response);
            currentProjects.value = currentProjects.value.filter(project => project.projectId !== projectId)
        })
        .catch((error) => {
            console.log(error);
        })
}


// getting user's data from the backend

resumeServices.get(props.id).then((res) => {
    let resume = res.data;
    console.log(resume)
    resumeData.value = resume;
    selectedTemplate.value = resume.template;
});

educationServices.getAllForUser(userId).then((res) => {
    res.data.forEach((item) => {
        let education = item;
        console.log(item)
        currentEducations.value.push(education);
    });
});
experienceServices.getAllForUser(userId).then((res) => {
    res.data.forEach((item) => {
        let experience = item;
        console.log(item)
        currentExperiences.value.push(experience);
    });
});
skillServices.getAllForUser(userId).then((res) => {
    res.data.forEach((item) => {
        let skill = item;
        console.log(item)
        currentSkills.value.push(skill);
    });
});
projectServices.getAllForUser(userId).then((res) => {
    res.data.forEach((item) => {
        let project = item;
        console.log(item)
        currentProjects.value.push(project);
    });
});



</script>

<style scoped>
.resumePreview {
    width: 135px;
    height: 240px;
    background-color: lightgrey;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.resumePreview.selected {
    border: 2px solid #1976d2;
}

v-card {
    margin-bottom: 15px;
    padding: 10px;
}

v-row {
    margin-bottom: 10px;
}

v-col {
    padding: 5px;
}

.v-btn {
    margin-top: 20px;
}

.selected-card {
    background-color: #03203f;
    color: white;
    border: 2px solid #1565c0;
    cursor: pointer;
}
</style>
