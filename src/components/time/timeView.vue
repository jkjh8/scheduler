<script setup>
import { ref, onMounted } from 'vue'

const currentDateTime = ref('')

onMounted(() => {
  window.ipc.on('timer', (arg) => {
    currentDateTime.value = arg.full
  })
})
</script>

<template>
  <div>
    {{ currentDateTime }}
  </div>
</template>
