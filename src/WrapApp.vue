<template>
  <el-config-provider :locale="zhCn">
    <App />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import App from '@/App.vue';
</script>

<style></style>
