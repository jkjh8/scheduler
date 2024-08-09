<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'
import StatusIndicator from 'components/statusIndicator.vue'
import TimeView from 'components/time/timeView.vue'
import { fnUpdateSettings } from 'src/composables/useSettings'
import { fnUpdateSchedules } from 'src/composables/useSchedules'
import { version } from '../../package.json'

const $r = useRouter()
const $q = useQuasar()

onMounted(async () => {
  console.log('MainLayout mounted')
  // init
  window.ipc.on('settings', (args) => fnUpdateSettings(args))
  // schedule
  window.ipc.on('schedules', (arr) => fnUpdateSchedules(arr))
  // open trigger
  window.ipc.send('ui:open')
  // get Token
  // window.ipc.send('api:tokens')
  window.ipc.on('disconnect', (args) => {
    $q.notify({
      icon: 'warning',
      message: `${args.type.toUpperCase()} 서버 연결이 끊어졌습니다.`,
      caption: '재접속을 시도합니다.',
      color: 'warning',
      position: 'top',
      actions: [
        {
          icon: 'close',
          round: true,
          color: 'white',
          handler: () => {}
        }
      ]
    })
  })
  window.ipc.on('connect', (args) => {
    $q.notify({
      icon: 'cloud_done',
      message: `${args.type.toUpperCase()} 서버 연결이 재연결되었습니다.`,
      color: 'positive',
      position: 'top',
      actions: [
        {
          icon: 'close',
          round: true,
          color: 'white',
          handler: () => {}
        }
      ]
    })
  })
  window.ipc.on('autoconnect', () => {
    $q.notify({
      icon: 'info',
      message: `자동 연결이 설정되어 있습니다.`,
      color: 'info',
      position: 'top',
      actions: [
        {
          icon: 'close',
          round: true,
          color: 'white',
          handler: () => {}
        }
      ]
    })
  })
  window.ipc.on('autodisconnect', () => {
    $q.notify({
      icon: 'info',
      message: `자동 절체가 실행되었습니다.`,
      caption: '5분후에 백업 서버로 전환 됩니다.',
      color: 'info',
      position: 'top',
      actions: [
        {
          icon: 'close',
          round: true,
          color: 'white',
          handler: () => {}
        }
      ]
    })
  })
  window.ipc.on('active:mode', (mode) => {
    $q.notify({
      icon: 'warning',
      message: `스케줄 동작이${mode.toUpperCase()} 변경되 었습니다.`,
      color: 'warning',
      position: 'top',
      actions: [
        {
          icon: 'close',
          round: true,
          color: 'white',
          handler: () => {}
        }
      ]
    })
  })
})
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-black">
      <q-toolbar class="justify-between">
        <div
          class="row no-wrap justify-start items-center q-gutter-x-sm cursor-pointer"
          @click="$r.push('/')"
        >
          <q-icon name="img:LogoMain.png" size="md" />
          <div class="toolbar-font">스케줄 컨트롤러</div>
          <div class="self-end caption sans-font">v{{ version }}</div>
        </div>

        <div class="row no-wrap g-gutter-x-sm">
          <q-btn flat icon="home" color="primary" @click="$r.push('/')">
            <q-tooltip>홈</q-tooltip>
          </q-btn>
          <q-separator vertical inset />
          <q-btn
            flat
            icon="schedule"
            color="primary"
            @click="$r.push('/schedule')"
          >
            <q-tooltip>스케줄</q-tooltip>
          </q-btn>
        </div>

        <div class="row no-wrap items-center q-gutter-x-sm">
          <TimeView />
          <q-icon
            class="cursor-pointer"
            name="settings"
            size="xs"
            color="primary"
            @click="$r.push('/setup')"
          >
            <q-tooltip>세팅</q-tooltip>
          </q-icon>
        </div>
      </q-toolbar>
      <q-separator />
      <StatusIndicator />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.toolbar-font {
  font-size: 20px;
  font-weight: 600;
  font-family: 'NotoSansKR';
  color: #333;
}
</style>
