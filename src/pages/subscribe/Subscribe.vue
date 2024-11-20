<template>
  <div class="container">
    <button class="back-button">←</button>
    <div class="form">
      <header class="header">
        <img src="/src/assets/helmet.png" alt="안전모 로고" class="logo" />
      </header>
      <div class="form-item">
        <label for="title">제목</label>
        <input type="text" id="title" v-model="title" class="input" />
      </div>
      <div class="form-item">
        <label for="subscription-type">구독 종류</label>
        <div class="dropdown">
          <input
              type="text"
              id="subscription-type"
              v-model="subscriptionType"
              class="input"
              readonly
              @click="toggleDropdown"
          />
          <ul v-if="dropdownVisible" class="dropdown-list">
            <li
                v-for="(option, index) in subscriptionOptions"
                :key="index"
                @click="selectOption(option)"
                class="dropdown-item"
            >
              {{ option }}
            </li>
          </ul>
        </div>
      </div>
      <div class="form-item">
        <label>정원</label>
        <div class="members">
          <button @click="decreaseMembers" class="member-button">-</button>
          <span class="member-count">{{ members }}명</span>
          <button @click="increaseMembers" class="member-button">+</button>
        </div>
      </div>
      <div class="form-item">
        <label for="subscription-period">구독 기간 (개월)</label>
        <input type="number" id="subscription-period" v-model.number="subscriptionPeriod" class="input" />
      </div>
      <div class="form-item">
        <label for="money-date">모금일</label>
        <input type="date" id="money-date" v-model="moneyDate" class="input" />
      </div>
      <div class="form-item button-container">
        <button class="next-button" @click="createRoom">다음</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const title = ref("");
const subscriptionType = ref("");
const subscriptionPeriod = ref(null);
const moneyDate = ref("");
const members = ref(2);

const subscriptionOptions = ref(["넷플릭스", "티빙", "디즈니 플러스", "스포티파이", "웨이브", "애플 뮤직"]);
const dropdownVisible = ref(false);

const increaseMembers = () => {
  members.value++;
};

const decreaseMembers = () => {
  if (members.value > 0) {
    members.value--;
  }
};

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

const selectOption = (option) => {
  subscriptionType.value = option;
  dropdownVisible.value = false;
};

const createRoom = async () => {
  // API URL 및 요청 데이터
  const apiUrl = "http://localhost:8080/room/basic/create";
  const requestData = {
    accountNumber: "1234-12345", // 정적으로 입력
    title: title.value,
    category: subscriptionType.value,
    numberTotal: members.value,
    period: subscriptionPeriod.value,
    dueDate: new Date(moneyDate.value).getDate(), // 날짜에서 일만 추출
  };

  try {
    const response = await axios.post(apiUrl, requestData, {
      params: {
        creatorId: "creator-123", // 정적 creatorId
      },
    });
    console.log(response.data); // 성공 메시지 표시
  } catch (error) {
    console.error("Error creating room:", error);
    alert(error.response?.data || "Failed to create room."); // 오류 메시지 표시
  }
};
</script>

<style scoped>
/* 스타일은 동일, 필요 시 추가 수정 */
.container {
  padding: 16px;
  font-family: Arial, sans-serif;
  position: relative;
  height: 100vh; /* 화면 높이를 고정 */
  box-sizing: border-box;
  overflow: hidden; /* 스크롤바 제거 */
}

/* 뒤로가기 버튼 */
.back-button {
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin-bottom: 16px;
}

/* 폼 스타일 */
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: calc(100% - 64px); /* 버튼 공간 확보 */
}

.form-item {
  display: flex;
  flex-direction: column;
}

.label {
  margin-bottom: 8px;
  font-weight: bold;
}

/* 입력 필드 스타일 */
.input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #e3e3e3;
  color: black;
  cursor: pointer;
}

/* 정원 필드 스타일 */
.members {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #e3e3e3;
  padding: 12px;
  border-radius: 4px;
  justify-content: space-between;
}

.member-button {
  padding: 8px 16px;
  border: none;
  background-color: #d3d3d3;
  cursor: pointer;
  border-radius: 4px;
}

.member-count {
  font-weight: bold;
}

/* 드롭다운 스타일 */
.dropdown {
  position: relative;
}

.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #e3e3e3;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 4px;
  z-index: 10;
  list-style: none;
  padding: 0;
}

.dropdown-item {
  padding: 12px;
  cursor: pointer;
  background-color: #f7f7f7;
}

.dropdown-item:hover {
  background-color: #d3d3d3;
}

/* 로고 스타일 */
.header {
  text-align: center;
  margin-bottom: 24px;
}

.logo {
  width: 100px;
  height: auto;
}

/* 모금일 컨테이너 */
.date-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 다음 버튼 */
.next-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  margin-left: 8px; /* 약간의 여백 추가 */
}

.next-button:hover {
  background-color: #0056b3;
}
</style>
