<template>
  <div class="account-selection-container">
    <h2>모임통장으로 사용할 계좌를 선택해 주세요.</h2>

    <!-- 계좌 선택 드롭다운 -->
    <div class="account-select">
      <label for="account">계좌선택</label>
      <select v-model="selectedAccount" id="account">
        <option disabled value="">계좌를 선택하세요</option>
        <option v-for="account in accounts" :key="account.id" :value="account.number">
          {{ account.name }} ({{ account.number }})
        </option>
      </select>
    </div>

    <!-- 새 계좌로 시작하기 버튼 -->
    <button @click="startNewAccount" class="new-account-btn">
      + 새 계좌 개설하기
    </button>

    <!-- 거래명 별표처리 토글 -->
    <!-- <div class="toggle-group">
      <label for="transaction-mark" class="toggle-label">거래명 별표처리</label>
      <input type="checkbox" id="transaction-mark" v-model="transactionMark" />
    </div> -->

    <!-- "다음" 버튼 -->
    <button :disabled="!selectedAccount" @click="nextStep" class="next-btn">
      다음
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// 계좌 목록
const accounts = ref([
  { id: 1, name: "KB나라사랑우대통장", number: "930002-00-1254686" },
  { id: 2, name: "주택청약종합저축", number: "930002-00-1243547" },
  { id: 3, name: "KB청년희망적금", number: "930002-00-1234567" },
]);

// 선택된 계좌와 거래명 별표처리 상태
const selectedAccount = ref("");
const transactionMark = ref(false);

const router = useRouter();

// 다음 단계로 이동
const nextStep = () => {
  if (!selectedAccount.value) {
    alert("계좌를 선택해주세요.");
    return;
  }
  console.log("선택된 계좌 ID:", selectedAccount.value);
  localStorage.setItem("accountNumber", selectedAccount.value);
  router.push("/startterms"); // 다음 페이지로 이동
};

// 새 계좌로 시작하기
const startNewAccount = () => {
  console.log("새 계좌로 시작하기 버튼 클릭");
  router.push("/startterms");
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
  background-color: #f4b400;
  color: white;
  border: none;
  padding: 14px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
}

.new-account-btn:hover:enabled {
  background: linear-gradient(45deg, #f9c502, #f4b400);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
  transform: translateY(-2px); /* 약간의 올라가는 효과 */
  color: #fff;
}

.new-account-btn:active:enabled {
  transform: translateY(0); /* 클릭 시 다시 원래 위치 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 그림자 축소 */
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
