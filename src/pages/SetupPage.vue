<script setup>
import { toRefs } from 'vue'
import { settings } from 'src/composables/useSettings.js'
import { useAddress } from 'src/composables/useAddress'

const { mainServer, backupServer, active } = toRefs(settings)
const { fnSetMainServerAddress } = useAddress()

const fnSendActiveValue = (value) => {
  window.ipc.send('active', value)
}
</script>

<template>
  <q-page style="padding: 5% 10%">
    <q-card style="min-width: 300px" flat>
      <!-- 메인서버 주소 -->
      <q-card-section>
        <!-- 주서버 -->
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
        <!-- 백업서버 -->
        <div class="row no-wrap justify-between">
          <!-- 이름 -->
          <div class="table-name">업무방송 백업서버</div>
          <!-- 값 -->
          <div class="row no-wrap items-center q-gutter-x-sm">
            <div v-if="backupServer">{{ backupServer }}</div>
            <div v-else class="text-grey">지정되지 않음</div>
            <!-- 수정 -->
            <q-btn icon="edit" round flat size="sm" color="primary"></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <!-- active -->
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
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>
.table-name {
  font-size: 1rem;
  font-weight: 600;
  font-family: 'NotoSansKR';
}
</style>
