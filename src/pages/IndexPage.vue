<script setup>
import { settings } from 'src/composables/useSettings.js'
const { mainStatus, backupStatus, active } = settings
</script>
<template>
  <q-page style="padding-top: 5px; padding-right: 5px">
    <div>index</div>
  </q-page>
</template>

<style scoped>
.icon-font {
  font-size: 10px;
  font-weight: 600;
  margin-left: 3px;
  font-family: 'NotoSansKR';
}
.active {
  color: #4caf50;
}
.inactive {
  color: #777;
}
</style>
