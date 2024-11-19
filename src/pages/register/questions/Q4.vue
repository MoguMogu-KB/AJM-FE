<template>
    <div>
      <header class="header">
        <img src="/src/assets/helmet.png" alt="안전모 로고" class="logo-icon" />
        <h2>구독 서비스를 구독하는 기간은 어떤 편이신가요?</h2>
      </header>
      
      <ProgressBar :progress="80" />
  
      <!-- 선택 항목 -->
      <div class="options">
        <button
          class="option"
          :class="{ active: selectedOption === '1-3개월' }"
          @click="selectOption('1-3개월')"
        >
          짧게 구독하고 다른 서비스를 이용해요. <br /> (1-3개월)
        </button>
        <button
          class="option"
          :class="{ active: selectedOption === '4-6개월' }"
          @click="selectOption('4-6개월')"
        >
          한 가지를 구독하기 시작하면 오래 구독하는 편이에요. <br /> (4-6개월)
        </button>
        <button
          class="option"
          :class="{ active: selectedOption === '6개월 이상' }"
          @click="selectOption('6개월 이상')"
        >
          한 가지를 구독해두고 오랜 기간 구독해요. <br /> (6개월 이상)
        </button>
      </div>
  
      <div class="button-group">
        <button
          class="next-button"
          :disabled="!selectedOption"
          @click="goToNextStep"
        >
          다음
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import ProgressBar from './ProgressBar.vue';
  
  const router = useRouter();
  const selectedOption = ref('');
  
  // 선택 항목 설정
  const selectOption = (option) => {
    selectedOption.value = option;
    console.log('선택된 구독 기간:', selectedOption.value);
  };
  
  // 다음 화면으로 이동
  const goToNextStep = () => {
    console.log('최종 선택된 구독 기간:', selectedOption.value);
    router.push('/Q5');
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
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin: 20px 0;
  }
  
  .option {
    width: 250px;
    padding: 15px 20px;
    font-size: 14px;
    border: 2px solid #f5a623;
    border-radius: 20px;
    background-color: #fff;
    color: #f5a623;
    cursor: pointer;
    text-align: center;
    transition: all 0.3s ease;
    line-height: 1.5;
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
  