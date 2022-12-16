<script setup lang="ts">
import { ref } from 'vue';
import { ElButton, ElMessage, ElCalendar } from 'element-plus';

const value = ref<Date>(new Date());

const handleClick = () => {
  ElMessage.success('hi');
};
</script>

<template>
  <div>
    <el-button type="primary" @click="handleClick">click</el-button>
  </div>
  <div>
    <el-calendar v-model="value" />
  </div>
</template>

<style lang="css" scoped></style>
