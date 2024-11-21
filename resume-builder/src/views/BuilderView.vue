<template>
    <v-container v-if="isAllowed">
        <v-col>
            <v-row justify="center">
                <v-card color="transparent" style="font-size: 30px; margin-bottom: 10px;">
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
                                <v-text-field v-model="userBody.fName" label="First Name *" type="text"
                                    required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="userBody.lName" label="Last Name *" type="text"
                                    required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="userBody.city" label="City *" type="text"
                                    required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-select v-model="userBody.state" label="State *" :items="states" required></v-select>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-card color="transparent" class="mb-3">
                        <v-card-title>
                            <h3>Contact and Links</h3>
                        </v-card-title>
                        <v-row>
                            <v-col>
                                <v-text-field v-model="userBody.phoneNumber" label="Phone Number *" type="phone-number"
                                    required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="userBody.contactEmail" label="Email *" type="email"
                                    required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="userBody.linkedInUrl" label="LinkedIn/Website"
                                    type="text"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card>

                    <v-card-title>
                        <h3>Professional Summary</h3>
                    </v-card-title>
                    <v-textarea v-model="resumeData.summary"
                        :label="selectedTemplate == 3 ? 'Professional Summary *' : 'Career Objective *'" required
                        class="mb-3"></v-textarea>
                </v-card>


                <!-- Education Section -->
                <v-card color="secondary" class="mb-4">

                    <v-card-title>
                        <v-row>
                            <h2>Education</h2>
                            <v-spacer />
                            <add-education :userId="userId" :educationList="currentEducations" mode="add"
                                @refresh-data="refreshEducationData" />
                        </v-row>
                    </v-card-title>

                    <v-card color="transparent" class="mb-3">
                        <v-row>
                            <v-col v-for="education in currentEducations" cols="6">
                                <v-card
                                    :color="selectedEducations.includes(education.educationId) ? 'selected' : 'unselected'"
                                    :elevation="selectedEducations.includes(education.educationId) ? 10 : 2"
                                    @click="educationSelection(education.educationId)" class=" mb-2">
                                    <v-card-title>
                                        <v-row>
                                            <h3>{{ education.institutionName }}</h3>
                                            <v-spacer />
                                            <add-education :userId="userId" :educationList="currentEducations"
                                                mode="edit" :educationToEdit="education"
                                                @refresh-data="refreshEducationData" />
                                            <v-icon @click="deleteEducation(education.educationId)">mdi-delete</v-icon>
                                        </v-row>
                                    </v-card-title>
                                    <v-card-text>
                                        <p>{{education.bachalorName }}</p>
                                        <p>{{ education.city }}, {{ education.state }}</p>
                                        <p>{{ education.startDate }} - {{ education.endDate }}</p>
                                        <p>GPA: {{ education.gpa }}</p>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
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
                                <v-btn v-if="selectedExperiences.includes(experience.experienceId)"
                                    @click="experienceSelection(experience.experienceId)">Selected</v-btn>
                                <v-btn v-else @click="experienceSelection(experience.experienceId)">Select</v-btn>
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

                <!-- (templates 1, 3 and 4): Skills Section -->
                <v-card color="primary" v-if="selectedTemplate != 2" class="mb-4">
                    <v-card-title>
                        <h2>Skills</h2>
                    </v-card-title>
                    <v-row>
                        <v-col v-for="skill in currentSkills" cols="2">
                            <v-card class="mb-2">
                                <v-btn @click="editSkill">Edit</v-btn>
                                <v-btn @click="deleteSkill(skill.skillId)">Delete</v-btn>
                                <v-btn v-if="selectedSkills.includes(skill.skillId)"
                                    @click="skillSelection(skill.skillId)">Selected</v-btn>
                                <v-btn v-else @click="skillSelection(skill.skillId)">Select</v-btn>
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

                <!-- (template 4 only) Honors/Awards/Certifications Section -->
                <v-card color="primary" v-if="selectedTemplate == 4" class="mb-4">
                    <v-card-title>
                        <h2>Honors/Awards/Certifications</h2>
                    </v-card-title>
                    <v-row>
                        <v-col v-for="award in currentAwards" cols="4">
                            <v-card class="mb-2">
                                <v-card-title>
                                    <h3>{{ award.title }}</h3>
                                </v-card-title>
                                <v-card-text>
                                    <p>{{ award.startDate }}</p>
                                    <p>{{ award.endDate }}</p>
                                    <p>{{ award.description }}</p>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                    <add-award />
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

            </v-form>
        </v-col>
        <v-btn v-if="!resumeId" class="mt-4" @click="createResume">Create and Generate Resume</v-btn>
        <v-btn v-else @click="saveResume">Save and Generate Resume</v-btn>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';

import TemplatePicker from '../components/TemplatePicker.vue';
import Utils from '@/config/utils';
import userServices from '@/services/userServices';
import resumeServices from '@/services/resumeServices';
import educationServices from '@/services/educationServices';
import experienceServices from '@/services/experienceServices';
import skillServices from '@/services/skillServices';
import awardServices from '@/services/awardServices';
import projectServices from '@/services/projectServices';
import { useRouter } from 'vue-router';

// creating important variables for the page

let props = defineProps({
    id: {
        type: Number,
    }
})

let resumeId = props.id;
console.log("resume id:" + resumeId)



let isAllowed = ref(resumeId ? false : true);

let selectedTemplate = ref(1);
let user = Utils.getStore("user");
let userId = user.userId;
let resumeData
if (resumeId) {
    resumeData = ref({
        title: "",
        template: "",
        summary: "",
        userId: 0,
    })
}
else {
    resumeData = ref({
        title: "newResume",
        template: "",
        summary: "",
        userId: user.userId,
    })
}
let userBody = ref({
    fName: "",
    lName: "",
    city: "",
    state: "",
    phoneNumber: "",
    email: "",
    contactEmail: "",
    linkedInUrl: "",
})
loadUserInfo();
// start of functions for data selection

const educationSelection = (educationId) => {
    const updateSelection = (action) => {
        let body = action === 'add' ? { addResumeId: resumeId } : { removeResumeId: resumeId };
        educationServices.updateRelation(educationId, body).then(() => {
            if (action === 'add') {
                selectedEducations.value.push(educationId);
                console.log(`Added education to resume: ${educationId}`);
            } else {
                selectedEducations.value = selectedEducations.value.filter(edu => edu !== educationId);
                console.log(`Removed education from resume: ${educationId}`);
            }
            console.log(`Updated list: ${selectedEducations.value}`);
        });
    };

    if (selectedEducations.value.includes(educationId)) {
        if (resumeId) updateSelection('remove');
        else selectedEducations.value = selectedEducations.value.filter(edu => edu !== educationId);
    } else {
        if (resumeId) updateSelection('add');
        else selectedEducations.value.push(educationId);
    }
};
const experienceSelection = (experienceId) => {
    const updateSelection = (action) => {
        let body = action === 'add' ? { addResumeId: resumeId } : { removeResumeId: resumeId };
        experienceServices.updateRelation(experienceId, body).then(() => {
            if (action === 'add') {
                selectedExperiences.value.push(experienceId);
                console.log(`Added experience to resume. ExperienceId: ${experienceId}`);
            } else {
                selectedExperiences.value = selectedExperiences.value.filter(exp => exp !== experienceId);
                console.log(`Removed experience from resume. ExperienceId: ${experienceId}`);
            }
            console.log(`Updated list: ${selectedExperiences.value}`);
        });
    };

    if (selectedExperiences.value.includes(experienceId)) {
        if (resumeId) updateSelection('remove');
        else selectedExperiences.value = selectedExperiences.value.filter(exp => exp !== experienceId);
    } else {
        if (resumeId) updateSelection('add');
        else selectedExperiences.value.push(experienceId);
    }
};
const skillSelection = (skillId) => {
    const updateSelection = (action) => {
        let body = action === 'add' ? { addResumeId: resumeId } : { removeResumeId: resumeId };
        skillServices.updateRelation(skillId, body).then(() => {
            if (action === 'add') {
                selectedSkills.value.push(skillId);
                console.log(`Added skill to resume. skillId: ${skillId}`);
            } else {
                selectedSkills.value = selectedSkills.value.filter(skl => skl !== skillId);
                console.log(`Removed skill from resume. skillId: ${skillId}`);
            }
            console.log(`Updated list: ${selectedSkills.value}`);
        });
    };

    if (selectedSkills.value.includes(skillId)) {
        if (resumeId) updateSelection('remove');
        else selectedSkills.value = selectedSkills.value.filter(skl => skl !== skillId);
    } else {
        if (resumeId) updateSelection('add');
        else selectedSkills.value.push(skillId);
    }
};

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

if (resumeId) {
    getResumeData(resumeId)
}

let currentEducations = ref([])
let selectedEducations = ref([]);
if (resumeId) getSelectedEducation(resumeId);
getAllEducation(userId);

let currentExperiences = ref([])
let selectedExperiences = ref([]);
if (resumeId) getSelectedExperiences(resumeId);
getAllExperiences(userId);

let currentSkills = ref([])
let selectedSkills = ref([]);
if (resumeId) getSelectedSkills(resumeId);
getAllSkills(userId);

let currentAwards = ref([])
let selectedAwards = ref([]);
if (resumeId) getSelectedAwards(resumeId);
getAllAwards(userId);

let currentProjects = ref([])
getAllProjects(userId);
// functions that send requests to backend
let router = useRouter();

let createResume = () => {
    resumeData.value.template = selectedTemplate.value;
    console.log("Creating Resume with template: " + selectedTemplate.value);
    resumeServices.create(resumeData.value)
        .then((response) => {
            console.log("Created Resume!");
            console.log(response);
            let newResumeId = response.data.resumeId
            let newSelections = {
                educationId: selectedEducations.value,
                experienceId: selectedExperiences.value,
                skillId: selectedSkills.value
            }
            resumeServices.addResumeEducations(newResumeId, newSelections)
                .then((response) => {
                    console.log("Added educations to resume:", response);
                })
                .catch((error) => {
                    console.error("Error adding educations to resume:", error);
                });
            router.push("/build/saved/" + newResumeId);
        })
        .catch((error) => {
            console.log(error);
        })
}
let saveResume = () => {
    resumeData.value.template = selectedTemplate.value;
    console.log("Saving Resume with template: " + selectedTemplate.value + " and resumeId: " + resumeId);
    resumeServices.update(resumeId, resumeData.value)
        .then((response) => {
            console.log("Saved Resume!");
            console.log(response);
            let newResumeId = response.data.resumeId
            router.push("/build/saved");
        })
        .catch((error) => {
            console.log(error);
        })
}

let deleteEducation = (educationId) => {
    educationServices.delete(educationId)
        .then((response) => {
            console.log("Education deleted:", response);
            refreshEducationData();
        })
        .catch((error) => {
            console.error("Error deleting education:", error);
        });
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

// getting user's data from the backend
function loadUserInfo() {
    userServices.getUserForId(userId)
        .then(response => {
            userBody.value = response.data;
            console.log("Admin?")
            console.log(userBody.value.isAdmin)
            if (userBody.value.isAdmin) isAllowed.value = true;
        })
        .catch(e => {
            console.log(e);
        });
}

function getResumeData(resumeId) {
    console.log("Getting resume data for resume:" + resumeId)
    resumeServices.get(resumeId).then((res) => {
        let resume = res.data;
        console.log("Resume data:")
        console.log(resume)
        resumeData.value = resume;
        if (resumeData.value.userId == userId) isAllowed.value = true;
        selectedTemplate.value = resume.template;
    });
}

function getAllEducation(userId) {
    educationServices.getAllForUser(userId).then((res) => {
        res.data.forEach((item) => {
            let education = item;
            currentEducations.value.push(education);
        });
    });
}
function getSelectedEducation(resumeId) {
    resumeServices.getResumeEducations(resumeId).then((res) => {
        console.log("Getting selected education for resume:" + resumeId)
        res.data.forEach((item) => {
            let education = item;
            selectedEducations.value.push(education.educationId);
        });
        console.log("Here is the updated list with educationIds:" + selectedEducations.value);
    });
}

function getAllExperiences(userId) {
    console.log("Getting all experiences for user:" + userId)
    experienceServices.getAllForUser(userId).then((res) => {
        res.data.forEach((item) => {
            let experience = item;
            currentExperiences.value.push(experience);
        });
        console.log(currentExperiences.value)
    });
}
function getSelectedExperiences(resumeId) {
    resumeServices.getResumeExperiences(resumeId).then((res) => {
        console.log("Getting selected experience for resume:" + resumeId)
        res.data.forEach((item) => {
            let experience = item;
            selectedExperiences.value.push(experience.experienceId);
        });
        console.log("Here is the updated list with experienceIds:" + selectedExperiences.value);
    });
}

function getAllSkills(userId) {
    console.log("Getting all skills for user:" + userId)
    skillServices.getAllForUser(userId).then((res) => {
        res.data.forEach((item) => {
            let skill = item;
            currentSkills.value.push(skill);
        });
        console.log(currentSkills.value)
    });
}
function getSelectedSkills(resumeId) {
    resumeServices.getResumeSkills(resumeId).then((res) => {
        console.log("Getting selected skills for resume:" + resumeId)
        res.data.forEach((item) => {
            let skill = item;
            selectedSkills.value.push(skill.skillId);
        });
        console.log("Here is the updated list with SkillIds:" + selectedSkills.value);
    });
}

function getAllAwards(userId) {
    console.log("Getting all awards for user:" + userId)
    awardServices.getAllForUser(userId).then((res) => {
        res.data.forEach((item) => {
            let award = item;
            currentAwards.value.push(award);
        });
        console.log(currentAwards.value)
    });
}
function getSelectedAwards(resumeId) {
    resumeServices.getResumeAwards(resumeId).then((res) => {
        console.log("Getting selected awards for resume:" + resumeId)
        res.data.forEach((item) => {
            let award = item;
            selectedAwards.value.push(award.awardId);
        });
        console.log("Here is the updated list with AwardIds:" + selectedAwards.value);
    });
}

function getAllProjects(userId) {
    projectServices.getAllForUser(userId).then((res) => {
        console.log("Getting all projects for user:" + userId)
        res.data.forEach((item) => {
            let project = item;
            currentProjects.value.push(project);
        });
        console.log(currentProjects.value)
    });
}

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

.v-icon {
    cursor: pointer;
    transition: transform 0.2s;
}

.v-icon:hover {
    transform: scale(1.2);
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
