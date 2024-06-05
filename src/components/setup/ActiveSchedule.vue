<script setup>
import { toRefs } from 'vue'
import { settings } from 'src/composables/useSettings.js'

const { active } = toRefs(settings)

const fnSendActiveValue = (value) => {
  window.ipc.send('settings:active', value)
}
</script>

<template>
  <div class="row no-wrap justify-between">
    <!-- 이름 -->
    <div class="table-name">스케줄 동작</div>
    <!-- 값 -->
    <q-toggle
      v-model="active"
      color="primary"
      checked-icon="check"
      unchecked-icon="clear"
      @update:model-value="fnSendActiveValue"
    >
    </q-toggle>
  </div>
</template>

<style scoped></style>
