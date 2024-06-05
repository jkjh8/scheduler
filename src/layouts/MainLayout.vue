<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

import StatusIndicator from 'components/statusIndicator.vue'
import TimeView from 'components/time/timeView.vue'
import { fnUpdateSettings } from 'src/composables/useSettings'

const $r = useRouter()

onMounted(() => {
  console.log('MainLayout mounted')
  // init
  window.ipc.on('settings', (args) => fnUpdateSettings(args))
  window.ipc.send('ui:open')
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
    </q-header>

    <q-page-container>
      <StatusIndicator />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.toolbar-font {
  font-size: 20px;
  font-weight: 600;
  margin-left: 10px;
  font-family: 'NotoSansKR';
  color: #333;
}
</style>
