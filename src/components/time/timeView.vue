<script setup>
import { ref, onMounted } from "vue";

const currentDateTime = ref("");

const updateDateTime = () => {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  const day = now.toLocaleDateString(undefined, { weekday: "long" });
  currentDateTime.value = `${date} ${day} ${time}`;
};

onMounted(() => {
  updateDateTime();
  setInterval(updateDateTime, 1000);
});
</script>

<template>
  <div>
    {{ currentDateTime }}
  </div>
</template>
