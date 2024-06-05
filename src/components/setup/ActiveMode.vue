<script setup>
import { toRefs } from 'vue'
import { useQuasar } from 'quasar'
import { settings } from 'src/composables/useSettings.js'

import DialogMode from 'src/components/DialogMode.vue'

const $q = useQuasar()
const { mode } = toRefs(settings)

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
</script>

<template>
  <div class="row no-wrap justify-between">
    <!-- 이름 -->
    <div class="table-name">동작모드</div>
    <!-- 값 -->
    <div>
      <span v-if="mode === 'main'">메인서버APP</span>
      <span v-else>백업서버APP</span>
      <q-btn
        round
        flat
        color="primary"
        icon="edit"
        size="sm"
        @click="fnSelectMode"
      ></q-btn>
    </div>
  </div>
</template>

<style scoped></style>
