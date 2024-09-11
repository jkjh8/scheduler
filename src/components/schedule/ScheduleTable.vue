<script setup>
import { computed, toRefs, ref, onMounted } from 'vue'
import {
  schedules,
  fnGetSchedules,
  fnGetScheduleModeLabel
} from 'src/composables/useSchedules.js'

import TimeView from './TimeView.vue'
const columns = [
  {
    name: 'name',
    label: '이름',
    align: 'center',
    field: 'name',
    sortable: true
  },
  {
    name: 'user',
    label: '사용자',
    align: 'center',
    field: 'user',
    sortable: true
  },
  {
    name: 'repeat',
    label: '반복',
    align: 'center',
    field: 'repeat',
    sortable: true
  },
  {
    name: 'time',
    label: '시간',
    align: 'center',
    sortable: true
  },
  {
    name: 'zones',
    label: '방송구간',
    align: 'center',
    field: 'zones',
    sortable: true
  },
  {
    name: 'file',
    label: '송출',
    align: 'center',
    field: 'file',
    sortable: true
  }
]
</script>

<template>
  <div class="q-px-lg q-pt-sm">
    <div class="row no-wrap justify-between">
      <div class="row no-wrap items-center q-gutter-x-xs">
        <q-icon color="primary" name="schedule" size="sm" />
        <div class="text-h6 text-bold">오늘 스케줄</div>
      </div>
    </div>
    <q-table
      :columns="columns"
      :rows="schedules"
      :pagination="{ rowsPerPage: 10 }"
      wrap-cells
    >
      <template #body="props">
        <q-tr :props="props">
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
          <q-td key="mode" :props="props">
            <span v-if="props.row.Mode === 'live'">실시간방송</span>
            <span v-else-if="props.row.Mode === 'message'">메시지방송</span>
            <span v-else>TTS</span>
          </q-td>
          <q-td key="file" :props="props">
            <div v-if="props.row.Mode === 'live'">
              <q-icon name="mic" color="primary" size="xs" />
              <span v-if="props.row.Status && props.row.Status == 1">
                본사방송
              </span>
              <span v-else> 지역방송 </span>
            </div>
            <div v-if="props.row.file">
              <q-icon name="play_arrow" color="primary" size="xs" />
              {{ props.row.file.base }}
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<style scoped></style>
