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

<script>
export default {
  data() {
    return {
      password: [], // 비밀번호를 저장할 배열
      dialNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0], // 다이얼 버튼의 숫자
    };
  },
  methods: {
    addDigit(number) {
      if (this.password.length < 4) {
        this.password.push(number); // 비밀번호 배열에 숫자 추가
      }
    },
    submitPassword() {
      if (this.password.length === 4) {
        alert(`입력한 비밀번호: ${this.password.join('')}`);
        // 실제 비밀번호 제출 로직을 추가할 수 있음
      }
    },
  },
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
