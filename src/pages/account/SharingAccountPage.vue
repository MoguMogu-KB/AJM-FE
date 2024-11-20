<template>
  <div class="account-selection-container">
    <h2>모임통장으로 사용할 계좌를 선택해 주세요.</h2>
    
    <!-- 계좌 선택 드롭다운 -->
    <div class="account-select">
      <label for="account">계좌선택</label>
      <select v-model="selectedAccount" id="account">
        <option disabled value="">계좌를 선택하세요</option>
        <option v-for="account in accounts" :key="account.id" :value="account.id">
          {{ account.name }} ({{ account.number }})
        </option>
      </select>
    </div>

    <!-- 새 계좌로 시작하기 버튼 -->
    <button @click="startNewAccount" class="new-account-btn">
      + 새 계좌로 시작하기
    </button>

    <!-- 거래명 별표처리 토글 -->
    <div class="toggle-group">
      <label for="transaction-mark" class="toggle-label">거래명 별표처리</label>
      <input type="checkbox" id="transaction-mark" v-model="transactionMark" />
    </div>

    <!-- "다음" 버튼 -->
    <button :disabled="!selectedAccount" @click="nextStep" class="next-btn">
      다음
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accounts: [
        { id: 1, name: '용돈통장', number: '1234-5678-9101' },
        { id: 2, name: '여행통장', number: '9876-5432-1010' },
      ],
      selectedAccount: '',
      transactionMark: false, // 거래명 별표처리 상태
    };
  },
  methods: {
    nextStep() {
      this.$emit('next');
    },
    startNewAccount() {
      // 새 계좌 시작 로직 처리
      console.log("새 계좌로 시작하기 버튼 클릭");
    },
  },
};
</script>

<style scoped>
/* 기본 스타일 */
.account-selection-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
}

h2 {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.account-select {
  width: 100%;
  max-width: 350px;
  margin-bottom: 15px;
}

.account-select label {
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  color: #666;
}

select {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fff;
  box-sizing: border-box;
}

button {
  width: 100%;
  max-width: 350px;
  padding: 14px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 10px;
}

button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

button:hover:enabled {
  background-color: #f4b400;
}

.new-account-btn {
  background-color: #007bff;
  color: white;
}

.new-account-btn:hover:enabled {
  background-color: #0056b3;
}

/* 거래명 별표처리 토글 */
.toggle-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.toggle-label {
  font-size: 16px;
  margin-right: 10px;
}

input[type="checkbox"] {
  width: 20px;
  height: 20px;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .account-selection-container {
    padding: 16px;
  }

  h2 {
    font-size: 18px;
  }

  select,
  button {
    font-size: 14px;
    padding: 12px;
  }
}
</style>