<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar, useDialogPluginComponent } from 'quasar'
// dialog functions
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()
// props
const props = defineProps(['mode', 'caption'])
const emit = defineEmits([...useDialogPluginComponent.emits])
const newVal = ref('')

const options = [
  { label: '메인서버APP', value: 'main' },
  { label: '백업서버APP', value: 'backup' }
]

onMounted(() => {
  newVal.value = props.mode
})
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="border-radius: 8px">
      <q-card-section class="row no-wrap q-gutter-sm items-center">
        <q-icon
          style="margin-top: 10px"
          name="edit"
          color="primary"
          size="1.5rem"
        />
        <div>
          <div class="dialog-name">어플리케이션 동작 모드 설정</div>
          <div v-if="caption" class="caption sans-font">
            어플리케이션 동작 모드메인 혹은 백업을 선택하세요
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-px-md">
        <q-select
          v-model="newVal"
          :options="options"
          filled
          label="동작모드"
          emit-value
          map-options
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          round
          flat
          color="red-10"
          icon="cancel"
          @click="onDialogCancel"
        />
        <q-btn
          round
          flat
          no-caps
          color="primary"
          icon="check_circle"
          @click="onDialogOK(newVal)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style>
.confirmDialog {
  max-width: 300px;
  min-width: 200px;
  border-radius: 0.5rem;
}
</style>
