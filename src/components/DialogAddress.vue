<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar, useDialogPluginComponent } from 'quasar'
// dialog functions
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()
// props
const props = defineProps(['address', 'title', 'caption'])
const emit = defineEmits([...useDialogPluginComponent.emits])
const newAddress = ref('')

onMounted(() => {
  newAddress.value = props.address
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
          <div class="dialog-name">{{ title }}</div>
          <div v-if="caption" class="caption sans-font">{{ caption }}</div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="newAddress" filled label="Address" />
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
          @click="onDialogOK(newAddress)"
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
