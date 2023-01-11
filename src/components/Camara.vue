<script setup lang="ts">
import { ref } from 'vue';

const camera = ref<HTMLMediaElement>();

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream: MediaStream) => {
    camera.value.srcObject = stream;
  });
</script>

<template>
  <div class="camara-container">
    <video autoplay ref="camera"></video>
  </div>
</template>
