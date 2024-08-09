<script setup>
import { settings } from 'src/composables/useSettings.js'
import { useQuasar } from 'quasar'
import dialogConfirm from 'src/components/dialogConfirm.vue'
const $q = useQuasar()

const changeMode = (mode) => {
  $q.dialog({
    component: dialogConfirm,
    componentProps: {
      icon: 'info',
      iconColor: 'priamry',
      title: '스케줄러 변경',
      message: `스케줄러를 ${
        mode === 'main' ? '메인' : '백업'
      }으로 변경하시겠습니까?`
    }
  }).onOk(() => {
    window.ipc.send('active:mode', mode)
  })
}
</script>
<template>
  <q-page padding>
    <div>
      <div class="q-gutter-y-xl">
        <div class="row justify-center items-center q-gutter-x-sm">
          <span> 현제 동작 스케줄러는 </span>
          <span class="text-h6">
            {{ settings.activeMode.toUpperCase() }}
          </span>
          <span> 스케줄러 입니다. </span>
        </div>
        <div class="row justify-center q-gutter-x-xl">
          <q-btn
            size="52px"
            :color="settings.activeMode === 'main' ? 'primary' : 'grey'"
            @click="changeMode('main')"
          >
            <div>메인</div>
          </q-btn>
          <q-separator vertical inset />
          <q-btn
            size="52px"
            :color="settings.activeMode !== 'main' ? 'red' : 'grey'"
            @click="changeMode('backup')"
          >
            <div>백업</div>
          </q-btn>
        </div>
      </div>
    </div>
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
