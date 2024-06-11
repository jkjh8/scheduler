<script setup>
import { toRefs, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { settings } from 'src/composables/useSettings.js'
import DialogMode from './DialogMode.vue'

const { mainStatus, backupStatus, active, mode } = toRefs(settings)
const $q = useQuasar()

const fnSelectMode = () => {
  $q.dialog({
    component: DialogMode,
    componentProps: {
      mode: mode.value
    }
  }).onOk((newMode) => {
    settings.mode = newMode
    window.ipc.send('settings:mode', newMode)
  })
}

const fnRefreshSchedule = () => {
  window.ipc.send('schedule:refresh')
}

onMounted(() => {})
</script>
<template>
  <div class="row no-wrap justify-between items-center q-pa-sm">
    <div
      class="row no-wrap items-center q-gutter-x-sm q-pl-md cursor-pointer"
      @click="fnSelectMode"
    >
      <q-icon
        name="dns"
        size="xs"
        :color="mode === 'main' ? 'primary' : 'red-10'"
      ></q-icon>
      <div>동작 모드:</div>
      <div>{{ mode.toUpperCase() }}</div>
      <q-icon name="edit" color="primary" />
    </div>

    <div class="row justify-end items-center q-gutter-x-sm">
      <!-- 메인서버 상태 표시 -->
      <div
        class="row no-wrap items-center"
        :class="mainStatus ? 'active' : 'inactive'"
      >
        <q-icon name="storage"></q-icon>
        <div class="icon-font">MAIN</div>
      </div>
      <!-- 백업서버 상태 표시 -->
      <div
        class="row no-wrap items-center"
        :class="backupStatus ? 'active' : 'inactive'"
      >
        <q-icon name="storage"></q-icon>
        <div class="icon-font">BACKUP</div>
      </div>
      <!-- active 상태 표시 -->
      <div>
        <div
          v-if="active"
          class="row no-wrap items-center active"
          color="primary"
        >
          <q-icon name="play_circle"></q-icon>
          <div class="icon-font">동작중</div>
        </div>
        <div v-else class="row no-wrap items-center inactive">
          <q-icon name="pause_circle"></q-icon>
          <div class="icon-font">대기중</div>
        </div>
      </div>
      <!-- 스케줄 리프레시 -->
      <q-icon
        class="cursor-pointer"
        name="refresh"
        size="xs"
        color="primary"
        @click="fnRefreshSchedule"
      >
        <q-tooltip>스케줄갱신</q-tooltip>
      </q-icon>
    </div>
  </div>
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
