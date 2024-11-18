<template>
  <div class="container">
    <div class="header">
      <img :src="logo" alt="모임 로고" class="logo" />
      <div class="info">
        <h2>{{ title }}</h2>
        <p>{{ idDetail }}</p>
      </div>
      <button class="menu-button">⋮</button>
    </div>
    <br />
    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: progress + '%' }"></div>
    </div>
    <br />
    <div class="login-info">
      <h3>로그인 정보 공유</h3>
      <div class="input-group">
        <label>아이디</label>
        <span class="text">{{ username }}</span>
        <button class="copy-button" @click="copyToClipboard(username)">복사</button>
      </div>
      <div class="input-group">
        <label>비밀번호</label>
        <span :class="['text', 'password']">
          <span v-if="isPasswordVisible">{{ password }}</span>
          <span v-else>●●●●●●●●</span>
        </span>
        <button class="eye-button" @click="togglePasswordVisibility">👁️</button>
      </div>
      <div v-if="role === '팀장'">
        <button class="save-button" @click="saveLoginInfo">로그인 정보 저장</button>
      </div>
    </div>

    <div v-if="role === '팀원'" class="pay-button-container">
      <button class="pay-button">이번 달 회비 납부하기</button>
    </div>

    <div class="member-status-container">
      <h3>이번 달 납부 현황</h3>
      <br />
      <div class="avatars">
        <div v-for="member in members" :key="member.id" class="avatar">
          <img :src="avatarImage" alt="member avatar" />
          <p>{{ member.name }}</p>
        </div>
      </div>
    </div>
    <br />
    <div class="payment-history">
      <h3>모임 통장 결제 내역</h3>
      <br />
      <div
        v-for="transaction in transactions"
        :key="transaction.id"
        class="transaction"
      >
        <div class="transaction-info">
          <strong>{{ transaction.name }}</strong><br />
          <span>{{ transaction.date }}</span>
        </div>
        <span
          :class="['amount', transaction.isMain ? 'highlight-red' : 'highlight-blue']"
        >
          {{ transaction.amount }} 원
        </span>
      </div>
    </div>
    <br />
    <button class="leave-button" v-if="role === '팀원'">
      이 모임에서 나가기
    </button>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Footer from '@/components/common/Footer.vue';

const route = useRoute();

// Account 정보 (AccountHome에서 전달된 데이터)
const logo = route.query.logo;
const title = route.query.title;
const idDetail = route.query.idDetail;
const progress = route.query.progress;
const role = route.query.role;

// 회원 정보 및 거래 내역 예제 데이터 (실제 데이터는 백엔드에서 받아올 수 있음)
const members = [
  { id: 1, name: '홍길동' },
  { id: 2, name: '김길동' },
  { id: 3, name: '장길동' },
  { id: 4, name: '조길동' },
];

const transactions = [
  { id: 1, name: 'TVING 결제', date: '2024.11.08 12:40', amount: '17000', isMain: true },
  { id: 2, name: '홍길동', date: '2024.11.07 12:40', amount: '4250', isMain: false },
  { id: 3, name: '박소연', date: '2024.11.07 12:40', amount: '4250', isMain: false },
  { id: 4, name: '김미연', date: '2024.11.07 12:40', amount: '4250', isMain: false },
];

const username = ref('ajm123');
const password = ref('mySecretPassword');
const isPasswordVisible = ref(false);

const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => alert('아이디가 복사되었습니다.'))
    .catch((err) => console.error('복사 실패:', err));
};

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const saveLoginInfo = () => {
  alert('로그인 정보가 저장되었습니다.');
};

const avatarImage = new URL('../../assets/puton.png', import.meta.url).href;
</script>


<style scoped>
.container {
  padding: 20px;
  background-color: #f9f9f9;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.logo {
  width: 60px;
  height: 60px;
  margin-right: 15px;
}

.info {
  text-align: center;
}

.info h2 {
  font-size: 1.5rem;
  margin: 0;
}

.info p {
  color: #888;
  font-size: 0.9rem;
}

.menu-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #888;
}

.progress-bar-container {
  background-color: #e0e0e0;
  border-radius: 10px;
  height: 6px;
  margin: 10px 0;
  position: relative;
}

.progress-bar {
  height: 100%;
  background-color: #ffa500;
  border-radius: 10px;
}

.login-info {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 20px;
}

.input-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.text {
  font-size: 1rem;
  color: #333;
}

.copy-button,
.eye-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #888;
}

.save-button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #FFDC8B;
  color: #656363;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.pay-button-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.pay-button {
  width: 90%;
  padding: 10px;
  margin: 10px;
  background-color: #FFDC8B;
  color: #656363;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;

}

.member-status-container {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 20px;
}

.avatars {
  display: flex;
  justify-content: space-between;
}

.avatar {
  text-align: center;
  width: 20%;
}

.avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.payment-history {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 20px;
}

.transaction {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.transaction:last-child {
  border-bottom: none;
}


.transaction-info strong {
  font-weight: bold;
}

.transaction-info span {
  font-size: 0.9rem;
  color: #888;
}

.amount {
  font-weight: bold;
  font-size: 1rem;
}

.highlight-red {
  color: #ff4500;
}

.highlight-blue {
  color: #1e90ff;
}

.leave-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #ffcccc;
  color: #ff0000;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
</style>


