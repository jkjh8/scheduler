<script setup>
import { computed, toRefs, ref, onMounted } from 'vue'
import {
  schedules,
  fnGetSchedules,
  fnGetScheduleModeLabel
} from 'src/composables/useSchedules.js'

import TimeView from './TimeView.vue'
import columns from './columns.js'
</script>

<template>
  <div class="q-px-lg q-pt-sm">
    <div class="row no-wrap justify-between">
      <div class="row no-wrap items-center q-gutter-x-xs">
        <q-icon color="primary" name="schedule" size="sm" />
        <div class="text-h6 text-bold">오늘 스케줄</div>
      </div>
    </div>
    <q-table :columns="columns" :rows="schedules">
      <template #body="props">
        <q-tr :props="props">
          <q-td key="idx" :props="props">
            {{ props.row.idx }}
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="user" :props="props">
            {{ props.row.user }}
          </q-td>
          <q-td key="repeat" :props="props">
            {{ fnGetScheduleModeLabel(props.row.repeat) }}
          </q-td>
          <q-td key="time" :props="props">
            <TimeView
              :repeat="props.row.repeat"
              :weekDays="props.row.weekDays"
              :date="props.row.date"
              :time="props.row.time"
            />
          </q-td>
          <q-td key="zones" :props="props">
            <span v-for="zone in props.row.zones" :key="zone">
              <q-chip size="sm" color="primary" text-color="white">
                {{ zone }}
              </q-chip>
            </span>
          </q-td>
          <q-td key="file" :props="props">
            <div v-if="props.row.file">
              {{ props.row.file.base }}
            </div>
          </q-td>
          <!-- <q-td key="actions" :props="props">
            <div>
              <q-btn round flat icon="edit" color="primary" size="sm">
                <q-tooltip>수정</q-tooltip>
              </q-btn>
              <q-btn round flat icon="delete" color="red-10" size="sm">
                <q-tooltip>삭제</q-tooltip>
              </q-btn>
            </div>
          </q-td> -->
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<style scoped></style>
