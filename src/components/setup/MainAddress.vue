<script setup>
import { toRefs } from 'vue'
import { settings } from 'src/composables/useSettings.js'
import { useAddress } from 'src/composables/useAddress'

const { mainServer } = toRefs(settings)
const { fnSetMainServerAddress } = useAddress()
</script>

<template>
  <div class="row no-wrap justify-between">
    <!-- 이름 -->
    <div class="table-name">업무방송 메인서버</div>
    <!-- 값 -->
    <div class="row no-wrap items-center q-gutter-x-sm">
      <div v-if="mainServer">{{ mainServer }}</div>
      <div v-else class="text-grey">지정되지 않음</div>
      <!-- 수정 -->
      <q-btn
        icon="edit"
        round
        flat
        size="sm"
        color="primary"
        @click="fnSetMainServerAddress(mainServer)"
      ></q-btn>
    </div>
  </div>
</template>

<style scoped></style>
