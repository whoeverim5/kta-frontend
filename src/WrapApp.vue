<template>
  <el-config-provider :locale="zhCn">
    <App></App>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import { zhCn } from 'element-plus/es/locale/index';
import App from '@/App.vue';
</script>

<style></style>
