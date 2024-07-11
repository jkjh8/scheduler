<script setup>
import { toRefs } from 'vue'
import { settings } from 'src/composables/useSettings.js'
import { useNotify } from 'src/composables/useNotify'
const { fnNotiInfo } = useNotify()

const { relayOnTime } = toRefs(settings)

const fnRefreshRelayTime = () => {
  window.ipc.send('settings:relayOnTime')
  fnNotiInfo('방송기동시간을 새로고침합니다.')
}
</script>

<template>
  <div class="row no-wrap justify-between">
    <!-- 이름 -->
    <div class="table-name">방송기동시간</div>
    <!-- 값 -->
    <div class="row no-wrap items-center">
      <span>{{ relayOnTime }}</span>
      <span>초</span>
      <q-btn
        round
        flat
        icon="refresh"
        color="primary"
        size="sm"
        @click="fnRefreshRelayTime"
      >
        <q-tooltip>새로고침</q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<style scoped></style>
