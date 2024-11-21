<template>
  <div class="password-container">
    <h2>계좌 비밀번호 입력</h2>

    <!-- 비밀번호 입력 칸 -->
    <div class="password-input">
      <span v-for="(digit, index) in password" :key="index" class="password-digit">
        ●
      </span>
    </div>

    <!-- 다이얼 -->
    <div class="dial-container">
      <div class="dial" v-for="number in dialNumbers" :key="number" @click="addDigit(number)">
        {{ number }}
      </div>
    </div>

    <!-- 완료 버튼 -->
    <div class="button-container">
      <button @click="submitPassword" :disabled="password.length !== 4">완료</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios';

const router = useRouter();

// 비밀번호 상태 및 다이얼 번호 정의
const password = ref([]); // 비밀번호를 저장할 배열
const dialNumbers = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]); // 다이얼 버튼의 숫자

// 숫자 추가 함수
const addDigit = (number) => {
  if (password.value.length < 4) {
    password.value.push(number); // 비밀번호 배열에 숫자 추가
  }
};

// 비밀번호 제출 함수
const submitPassword = async () => {
  if (password.value.length === 4) {
    // 실제 비밀번호 제출 로직

    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("ROLE");
    try {
      // Axios를 이용해 백엔드로 데이터 전송
      const response = await axios.post("https://7f96-14-36-176-7.ngrok-free.app/account/sharingAccount/create", null,
        {
          params: { userId: userId }
        });
      if (response.status === 200) {
        alert("새로운 모임통장용 계좌 개설이 완료되었습니다!");

        const accountResponse = await axios.get("https://7f96-14-36-176-7.ngrok-free.app/account/sharingAccount",
          {
            params: { userId: userId },
            headers: { 'ngrok-skip-browser-warning': '69420' }
          }
        );

        const accountNum = accountResponse.data;
        localStorage.setItem("accountNum", accountNum);
        if (role) {
          router.push("/subscribe");
        }
        else {
          router.push("Q1");
        }
      }
    } catch (error) {
      console.error("계좌 개설 실패:", error);
      alert("계좌 개설 중 오류가 발생했습니다.");
    }
  }
};
</script>

<style scoped>
.password-container {
  width: 300px;
  margin: 0 auto;
  text-align: center;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.password-input {
  font-size: 1.5rem;
  margin-bottom: 30px;
}

.password-digit {
  margin: 0 5px;
  font-weight: bold;
}

.dial-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.dial {
  font-size: 2rem;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dial:hover {
  background-color: #f4b400;
  color: white;
}

.button-container button {
  padding: 12px 20px;
  font-size: 1rem;
  background-color: #f4b400;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.button-container button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
