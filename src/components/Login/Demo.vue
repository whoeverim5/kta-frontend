<script setup lang="ts">
import { ElButton, ElMessage, ElTable, ElPagination } from 'element-plus';

const handleClick = () => {
  ElMessage.success('hi');
};
</script>

<template>
  <div>
    <el-button type="primary" @click="handleClick">click</el-button>
  </div>
  <div>
    <el-table mb-1 :data="[]" />
    <el-pagination :total="100" />
  </div>
</template>
