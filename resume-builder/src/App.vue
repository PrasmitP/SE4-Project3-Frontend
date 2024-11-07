<template>
  <v-app theme="customTheme">
    <v-main>
      <v-app-bar color="primary">
        <v-toolbar-title>
          <span >Resume</span>
          <span class="font-weight-light">Builder</span>
        </v-toolbar-title>
        <v-btn variant="plain" to="/">Home</v-btn>
        <v-btn variant="plain" to="/myInfo">My Information</v-btn>
        <v-spacer></v-spacer>  
        <v-btn variant="plain" to="/login">Login</v-btn>
      </v-app-bar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
//
</script>
