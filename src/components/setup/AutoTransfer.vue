<script setup>
import { settings } from 'src/composables/useSettings.js'

const fnAutoTransfer = (value) => {
  window.ipc.send('settings:auto', value)
}
</script>

<template>
  <div class="row no-wrap justify-between">
    <!-- 이름 -->
    <div class="table-name">자동전환</div>
    <!-- 값 -->
    <div>
      <q-toggle
        v-model="settings.auto"
        color="primary"
        checked-icon="check"
        unchecked-icon="clear"
        @update:model-value="fnAutoTransfer(settings.auto)"
      />
    </div>
  </div>
</template>

<style scoped></style>
