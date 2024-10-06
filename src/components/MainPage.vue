<template>
  <v-responsive class="border rounded">
    <v-app>
      <v-navigation-drawer v-model="drawer">
        <v-list>
          <v-list-item title="Navigation drawer"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar title="Cards">
        <template v-slot:prepend>
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </template>
        <v-btn icon>
          <v-icon @click="toggleTheme"> mdi-theme-light-dark</v-icon>
        </v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <UiLayout />
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script setup>
import UiLayout from "./UILayout";
import { useTheme } from "vuetify";
import { ref } from "vue";
const theme = useTheme();

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
};
const drawer = ref(true);
</script>
