<script setup>
import ScheduleTable from 'src/components/schedule/ScheduleTable.vue'
</script>
<template>
  <q-page style="padding-top: 5px; padding-right: 5px">
    <ScheduleTable />
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
