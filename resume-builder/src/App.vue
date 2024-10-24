<template>
  <v-app>
    <v-main>
      <v-app-bar>
        <v-toolbar-title>ResumeBuilder  </v-toolbar-title>
        <v-btn text to="/">Home</v-btn>
        <v-spacer></v-spacer>
        <v-btn text to="/login">Login</v-btn>
      </v-app-bar>

      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
//
</script>
