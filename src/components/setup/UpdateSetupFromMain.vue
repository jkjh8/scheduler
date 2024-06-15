<script setup>
import { settings } from 'src/composables/useSettings.js'

const fnUpdateTransfer = (value) => {
  window.ipc.send('settings:update', value)
}
</script>

<template>
  <div class="row no-wrap justify-between">
    <!-- 이름 -->
    <div class="table-name">메인서버로 부터 설정 업데이트</div>
    <!-- 값 -->
    <div>
      <q-toggle
        v-model="settings.update"
        color="primary"
        checked-icon="check"
        unchecked-icon="clear"
        @update:model-value="fnUpdateTransfer(settings.update)"
      />
    </div>
  </div>
</template>

<style scoped></style>
