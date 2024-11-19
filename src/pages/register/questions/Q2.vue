<template>
    <div>
      <header class="header">
        <img src="/src/assets/helmet.png" alt="안전모 로고" class="logo-icon" />
        <h2>사용해봤거나 사용하고 싶은 구독 서비스를 알려주세요.</h2>
      </header>
      
      <ProgressBar :progress="40" />
  
      <!-- 선택 항목 -->
      <div class="options">
        <button
          class="option"
          :class="{ active: selectedOptions.includes('넷플릭스') }"
          @click="toggleOption('넷플릭스')"
        >
          넷플릭스
        </button>
        <button
          class="option"
          :class="{ active: selectedOptions.includes('왓챠') }"
          @click="toggleOption('왓챠')"
        >
          왓챠
        </button>
        <button
          class="option"
          :class="{ active: selectedOptions.includes('티빙') }"
          @click="toggleOption('티빙')"
        >
          티빙
        </button>
        <button
          class="option"
          :class="{ active: selectedOptions.includes('디즈니 플러스') }"
          @click="toggleOption('디즈니 플러스')"
        >
          디즈니 플러스
        </button>
        <button
          class="option"
          :class="{ active: selectedOptions.includes('웨이브') }"
          @click="toggleOption('웨이브')"
        >
          웨이브
        </button>
        <button
          class="option"
          :class="{ active: selectedOptions.includes('애플TV') }"
          @click="toggleOption('애플TV')"
        >
          애플TV
        </button>
        <button class="option" @click="openModal">
          직접 작성하기
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
  
      <!-- 모달 창 -->
      <div v-if="isModalVisible" class="modal-overlay">
        <div class="modal">
          <h3>OTT 서비스 직접 작성</h3>
          <input
            v-model="customOption"
            placeholder="서비스 이름을 입력하세요"
            class="modal-input"
          />
          <div class="modal-buttons">
            <button class="modal-button" @click="addCustomOption">추가</button>
            <button class="modal-button cancel" @click="closeModal">취소</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import ProgressBar from './ProgressBar.vue';
  
  const router = useRouter();
  const selectedOptions = ref([]);
  const isModalVisible = ref(false);
  const customOption = ref('');
  
  // 선택/해제 기능
  const toggleOption = (option) => {
    if (selectedOptions.value.includes(option)) {
      selectedOptions.value = selectedOptions.value.filter((item) => item !== option);
    } else {
      selectedOptions.value.push(option);
    }
  };
  
  // 모달 창 열기
  const openModal = () => {
    isModalVisible.value = true;
  };
  
  // 모달 창 닫기
  const closeModal = () => {
    isModalVisible.value = false;
    customOption.value = ''; // 입력 필드 초기화
  };
  
  // 사용자 정의 옵션 추가
  const addCustomOption = () => {
    if (customOption.value.trim()) {
      selectedOptions.value.push(customOption.value.trim());
      closeModal();
    }
  };
  
  // 다음 화면으로 이동
  const goToNextStep = () => {
    console.log('선택된 OTT 서비스:', selectedOptions.value);
    router.push('/Q3');
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
  
  .modal-input {
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
  