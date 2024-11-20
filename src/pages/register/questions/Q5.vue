<template>
    <div>
        <header class="header">
            <img src="/src/assets/helmet.png" alt="안전모 로고" class="logo-icon" />
            <h2>선호하시는 구독 스타일이 어떻게 되시나요?</h2>
        </header>

        <ProgressBar :progress="100" />

        <!-- 선택 항목 -->
        <div class="options">
            <button class="option" :class="{ active: selectedOption === '높은 요금이더라도 소수 정예가 좋아요' }"
                @click="selectOption('높은 요금이더라도 소수 정예가 좋아요')">
                높은 요금이더라도 소수 정예가 좋아요
            </button>
            <button class="option" :class="{ active: selectedOption === '최대한 다수끼리 구독하고 저렴한 요금으로 구독하는 것이 좋아요' }"
                @click="selectOption('최대한 다수끼리 구독하고 저렴한 요금으로 구독하는 것이 좋아요')">
                최대한 다수끼리 구독하고 저렴한 요금으로 구독하는 것이 좋아요
            </button>
        </div>

        <div class="button-group">
            <button class="next-button" :disabled="!selectedOption" @click="goToNextStep">
                다음
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ProgressBar from './ProgressBar.vue';
import axios from 'axios';

const router = useRouter();
const selectedOption = ref('');

// 선택 항목 설정
const selectOption = (option) => {
    selectedOption.value = option;
    console.log('선택된 구독 스타일:', selectedOption.value);
};

// 다음 화면으로 이동
const goToNextStep = async () => {
    console.log('최종 선택된 구독 스타일:', selectedOption.value);

    const subscription = localStorage.getItem("subscriptionType");
    const ottServices = localStorage.getItem("ottServices");
    const userId = localStorage.getItem("userId");

    // 다음 페이지로 이동0
    const surveyData = {
        userId: userId,
        subscriptionType: subscription,
        ottServices: ottServices
    }
    try {
        // Axios를 이용해 백엔드로 데이터 전송
        const response = await axios.post("https://7f96-14-36-176-7.ngrok-free.app/user/survey/submit", surveyData
        );
        if (response.status === 200) {
            console.log("설문결과 저장 완료");
            localStorage.removeItem("subscriptionType");
            localStorage.removeItem("ottServices") // LocalStorage 데이터 삭제
        }
    } catch (error) {
        console.error("설문조사 실패:", error);
        alert("설문조사 중 오류가 발생했습니다.");
    }

    router.push('/result'); // 다음 화면으로 라우팅
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