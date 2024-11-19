<template>
    <div>
      <header class="header">
        <img src="/src/assets/helmet.png" alt="안전모 로고" class="logo-icon" />
        <h2>선호하는 결제 시기를 알려주세요.</h2>
      </header>
      
      <ProgressBar :progress="60" />
  
      <!-- 선택 항목 -->
      <div class="options">
        <button
          class="option"
          :class="{ active: selectedOption === '매월 초' }"
          @click="selectOption('매월 초')"
        >
          매월 초
        </button>
        <button
          class="option"
          :class="{ active: selectedOption === '매월 중순' }"
          @click="selectOption('매월 중순')"
        >
          매월 중순
        </button>
        <button
          class="option"
          :class="{ active: selectedOption === '매월 말' }"
          @click="selectOption('매월 말')"
        >
          매월 말
        </button>
        <button class="option" @click="openDaySelector">
          직접 작성하기
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
  
      <!-- 숫자 선택 모달 -->
      <div v-if="isDaySelectorVisible" class="modal-overlay">
        <div class="modal">
          <h3>결제일을 선택하세요</h3>
          <select v-model="customDay" class="day-selector">
            <option v-for="day in 30" :key="day" :value="day">{{ day }}일</option>
          </select>
          <div class="modal-buttons">
            <button class="modal-button" @click="addCustomDay">확인</button>
            <button class="modal-button cancel" @click="closeDaySelector">취소</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import ProgressBar from './ProgressBar.vue';
  
  const router = useRouter();
  const selectedOption = ref('');
  const isDaySelectorVisible = ref(false);
  const customDay = ref('');
  
  // 선택 항목 설정
  const selectOption = (option) => {
    selectedOption.value = option;
    console.log('선택된 결제 시기:', selectedOption.value);
  };
  
  // 숫자 선택 모달 열기
  const openDaySelector = () => {
    isDaySelectorVisible.value = true;
  };
  
  // 숫자 선택 모달 닫기
  const closeDaySelector = () => {
    isDaySelectorVisible.value = false;
    customDay.value = ''; // 초기화
  };
  
  // 사용자 정의 날짜 추가
  const addCustomDay = () => {
    if (customDay.value) {
      selectedOption.value = `${customDay.value}일`;
      console.log('선택된 결제 시기:', selectedOption.value);
      closeDaySelector();
    }
  };
  
  // 다음 화면으로 이동
  const goToNextStep = () => {
    console.log('최종 선택된 결제 시기:', selectedOption.value);
    router.push('/Q4');
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
    width: 200px;
    padding: 10px 20px;
    font-size: 16px;
    border: 2px solid #f5a623;
    border-radius: 20px;
    background-color: #fff;
    color: #f5a623;
    cursor: pointer;
    text-align: center;
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
  
  /* 모달 스타일 */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    text-align: center;
  }
  
  .modal h3 {
    margin-bottom: 15px;
  }
  
  .day-selector {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .modal-buttons {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
  
  .modal-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .modal-button:hover {
    background-color: #f5a623;
    color: white;
  }
  
  .modal-button.cancel {
    background-color: #ccc;
  }
  
  .modal-button.cancel:hover {
    background-color: #999;
  }
  </style>
  