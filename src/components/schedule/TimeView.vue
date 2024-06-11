<script setup>
import { localeKR } from 'src/composables/useSchedules.js'
const props = defineProps(['repeat', 'weekDays', 'date', 'time'])
</script>

<template>
  <div>
    <div v-if="repeat === 'once'">
      <div>
        {{ date }}
      </div>
      <div>
        {{ time }}
      </div>
    </div>
    <div v-if="repeat === 'everyDay'">
      {{ time }}
    </div>
    <div v-if="repeat === 'everyWeek'">
      <div>
        <q-chip
          v-for="day of weekDays"
          :key="day"
          color="primary"
          text-color="white"
          size="sm"
        >
          {{ localeKR.days[day] }}
        </q-chip>
      </div>
      <div>{{ time }}</div>
    </div>
  </div>
</template>
