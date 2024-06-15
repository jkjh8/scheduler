<script setup>
import { toRefs } from 'vue'
import { settings } from 'src/composables/useSettings.js'
import { useAddress } from 'src/composables/useAddress'

import MainAddress from 'src/components/setup/MainAddress.vue'
import BackupAddress from 'src/components/setup/BackupAddress.vue'
import ActiveSchedule from 'src/components/setup/ActiveSchedule.vue'
import ActiveMode from 'src/components/setup/ActiveMode.vue'
import AutoTrasfer from 'src/components/setup/AutoTransfer.vue'
import UpdateSetupFromMain from 'src/components/setup/UpdateSetupFromMain.vue'
</script>

<template>
  <q-page style="padding: 5% 10%">
    <q-card style="min-width: 300px" flat>
      <q-card-section>
        <!-- 동작모드 -->
        <ActiveMode />
        <AutoTrasfer />
        <update-setup-from-main />
      </q-card-section>

      <q-separator />

      <!-- 메인서버 주소 -->
      <q-card-section>
        <!-- 주서버 -->
        <MainAddress />
        <!-- 백업서버 -->
        <BackupAddress />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <!-- active -->
        <ActiveSchedule />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>
