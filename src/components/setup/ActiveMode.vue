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
    console.log('newMode', newMode)
    settings.mode = newMode
    window.ipc.send('settings:mode', newMode)
    $q.notify({
      message: '동작모드가 변경되었습니다.',
      caption: '앱을 재시작해야 적용됩니다.',
      position: 'top',
      color: 'warning', // 알림의 배경색
      icon: 'info', // 알림에 표시할 아이콘
      timeout: 3000, // 알림이 사라지기까지의 시간 (밀리초)
      actions: [
        {
          label: '닫기',
          color: 'white',
          handler: () => {
            /* 닫기 버튼 클릭 시 실행될 함수 */
          }
        }
      ]
    })
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
