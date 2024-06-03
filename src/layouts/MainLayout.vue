<script setup>
import TimeView from "components/time/timeView.vue";
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white text-black">
      <q-toolbar class="justify-between">
        <div class="row no-wrap justify-start items-center q-gutter-x-sm">
          <q-icon name="img:LogoMain.png" size="md" />
          <div class="toolbar-font">스케줄 컨트롤러</div>
        </div>
        <TimeView />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.toolbar-font {
  font-size: 20px;
  font-weight: 600;
  margin-left: 10px;
  font-family: "NotoSansKR";
  color: #333;
}
</style>
