<template>
    <div>
      <LoadingScreen v-if="isLoading" />
  
      <div v-else>
        <h2>설문조사가 완료되었습니다!</h2>
        <p>결과를 확인해보세요.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import LoadingScreen from './LoadingScreen.vue';
  
  const isLoading = ref(true);
  
  onMounted(() => {
    // 로딩 화면을 3초 동안 표시한 후 로딩 상태를 false로 변경
    setTimeout(() => {
      isLoading.value = false;
    }, 7000);
  });
  </script>
  
  <style>
  /* 결과 화면 스타일 */
  h2 {
    text-align: center;
    margin-top: 20px;
  }
  
  p {
    text-align: center;
    font-size: 16px;
  }
  </style>
  