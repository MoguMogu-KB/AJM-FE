<template>
  <div class="container">
    <button class="back-button" @click="navigateToUrl">←</button>
    <div class="form">
      <header class="header">
        <img
            src="/src/assets/helmet.png"
            alt="안전모 로고"
            class="logo"
            @click="openModal"
        />
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
        <input type="number" id="subscription-period" v-model.number="subscriptionPeriod" class="input"/>
      </div>
      <div class="form-item">
        <label for="money-date">모금일</label>
        <input type="date" id="money-date" v-model="moneyDate" class="input"/>
      </div>
      <div class="form-item button-container">
        <button class="next-button" @click="createRoom">다음</button>
      </div>
    </div>

    <!-- 모달창 -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <p>홈으로 이동하시겠습니까?</p>
        <div class="modal-buttons">
          <button class="modal-button" @click="navigateHome">네</button>
          <button class="modal-button" @click="closeModal">아니오</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios"; // axios import 추가

const router = useRouter();

const title = ref("");
const subscriptionType = ref("");
const subscriptionPeriod = ref(null);
const moneyDate = ref("");
const members = ref(2);
const showModal = ref(false); // 모달 표시 여부
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

const navigateToUrl = () => {
  router.push("/sharingAccount");
};

const selectOption = (option) => {
  subscriptionType.value = option;
  dropdownVisible.value = false;
};

const createRoom = async () => {
  const apiUrl = "http://localhost:8080/room/basic/create";
  const requestData = {
    accountNumber: "12345-67890",
    title: title.value,
    category: subscriptionType.value,
    numberTotal: members.value,
    period: subscriptionPeriod.value,
    dueDate: `${new Date(moneyDate.value).getFullYear()}${String(new Date(moneyDate.value).getMonth() + 1).padStart(2, '0')}${String(new Date(moneyDate.value).getDate()).padStart(2, '0')}`,
  };

  try {
    const response = await axios.post(apiUrl, requestData, {
      params: { creatorId: "user1" },
    });
    console.log(response.data);
    alert("방 생성이 성공적으로 완료되었습니다!"); // 성공 메시지
    router.push("/home"); // 요청 성공 시 /home으로 이동
  } catch (error) {
    console.error("Error creating room:", error);
    alert(error.response?.data || "Failed to create room.");
  }
};
// 모달 열기
const openModal = () => {
  showModal.value = true;
};

// 모달 닫기
const closeModal = () => {
  showModal.value = false;
};

// 홈으로 이동
const navigateHome = () => {
  showModal.value = false;
  router.push("/home"); // "/home" 경로로 이동
};
</script>

<style scoped>
/* 기본 스타일 */
.container {
  padding: 16px;
  font-family: Arial, sans-serif;
  position: relative;
  height: 100vh;
  box-sizing: border-box;
  overflow-y: auto; /* 스크롤 가능 */
}

.back-button {
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin-bottom: 16px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: calc(100% - 64px);
}

.form-item {
  display: flex;
  flex-direction: column;
}

.label {
  margin-bottom: 8px;
  font-weight: bold;
}

.input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #e3e3e3;
  color: black;
  cursor: pointer;
}

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

.header {
  text-align: center;
  margin-bottom: 24px;
}

.logo {
  width: 80px;
  height: auto;
}

/* 버튼 스타일 */
.next-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  margin-left: 8px;
}

.next-button:hover {
  background-color: #0056b3;
}

/* 미디어 쿼리 추가 */
@media (max-width: 768px) {
  .container {
    padding: 8px;
  }

  .form-item {
    gap: 12px;
  }

  .logo {
    width: 60px;
  }

  .input {
    padding: 10px;
  }

  .member-button {
    padding: 6px 12px;
    font-size: 12px;
  }

  .next-button {
    padding: 6px 12px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 8px;
  }

  .form-item {
    gap: 10px;
  }

  .logo {
    width: 50px;
  }

  .input {
    padding: 8px;
  }

  .member-button {
    padding: 4px 8px;
    font-size: 10px;
  }

  .next-button {
    padding: 4px 8px;
    font-size: 12px;
  }
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  width: 300px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.modal-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-button:first-child {
  background-color: #007bff;
  color: white;
}

.modal-button:first-child:hover {
  background-color: #0056b3;
}

.modal-button:last-child {
  background-color: #e3e3e3;
  color: black;
}

.modal-button:last-child:hover {
  background-color: #c3c3c3;
}

/* 로고 크기 조정 */
.logo {
  width: 120px; /* 크기를 약간 키움 */
  height: auto;
  cursor: pointer;
}
</style>

