<template>
    <div>
      <header class="header">
        <img src="/src/assets/helmet.png" alt="안전모 로고" class="logo-icon" />
        <h2>주로 구독하는 서비스의 유형을 알려주세요.</h2>
      </header>
      
      <ProgressBar :progress="20" />
  
      <!-- 선택 항목 -->
      <div class="options">
        <button
          class="option"
          :class="{ active: selectedOptions.includes('독서') }"
          @click="toggleOption('독서')"
        >
          독서
        </button>
        <button
          class="option"
          :class="{ active: selectedOptions.includes('미디어 시청') }"
          @click="toggleOption('미디어 시청')"
        >
          미디어 시청
        </button>
        <button
          class="option"
          :class="{ active: selectedOptions.includes('스포츠 / 게임') }"
          @click="toggleOption('스포츠 / 게임')"
        >
          스포츠 / 게임
        </button>
        <button
          class="option"
          :class="{ active: selectedOptions.includes('공부 / 학습') }"
          @click="toggleOption('공부 / 학습')"
        >
          공부 / 학습
        </button>
        <button
          class="option"
          :class="{ active: selectedOptions.includes('생산성') }"
          @click="toggleOption('생산성')"
        >
          생산성
        </button>
        <button
          class="option"
          :class="{ active: selectedOptions.includes('멤버십') }"
          @click="toggleOption('멤버십')"
        >
          멤버십
        </button>
        <button
          class="option"
          :class="{ active: selectedOptions.includes('기타') }"
          @click="toggleOption('기타')"
        >
          기타
        </button>
      </div>
  
      <div class="button-group">
        <button
          class="next-button"
          :disabled="selectedOptions.length === 0"
          @click="goToNextStep"
        >
          다음
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import ProgressBar from './ProgressBar.vue';
  
  const router = useRouter();
  const selectedOptions = ref([]);
  
  // 선택/해제 기능
  const toggleOption = (option) => {
    if (selectedOptions.value.includes(option)) {
      selectedOptions.value = selectedOptions.value.filter((item) => item !== option);
    } else {
      selectedOptions.value.push(option);
    }
  };
  
  // 다음 화면으로 이동
  const goToNextStep = () => {
    // 백엔드로 선택된 옵션을 전송할 준비
    console.log('선택된 옵션:', selectedOptions.value);
    router.push('/Q2');
  };
  </script>
  
  <style>
  /* 전체 화면 스타일 */
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
  
  /* 헤더 스타일 */
  .header {
    text-align: center;
    margin-top: 20px;
  }
  
  .logo-icon {
    width: 50px;
    margin-bottom: 10px;
  }
  
  h2 {
    font-size: 18px;
    color: #333;
  }
  
  /* 선택 항목 스타일 */
  .options {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin: 20px 0;
  }
  
  .option {
    padding: 10px 20px;
    font-size: 16px;
    border: 2px solid #f5a623;
    border-radius: 20px;
    background-color: #fff;
    color: #f5a623;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .option:hover {
    background-color: #f5a623;
    color: #fff;
  }
  
  .option.active {
    background-color: #f5a623;
    color: #fff;
    border-color: #f5a623;
  }
  
  /* 다음 버튼 스타일 */
  .button-group {
    text-align: center;
    margin-top: 20px;
  }
  
  .next-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #f5a623;
    color: #fff;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .next-button:hover {
    background-color: #d48a1a;
  }
  
  .next-button:disabled {
    background-color: #e0e0e0;
    color: #999;
    cursor: not-allowed;
  }
  </style>
  