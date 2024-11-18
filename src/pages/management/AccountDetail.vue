<template>
  <div class="container">
    <div class="header">
      <img :src="account.logo" alt="모임 로고" class="logo" />
      <div class="info">
        <h2>{{ account.title }}</h2>
        <p>{{ account.id }}</p>
      </div>
      <button class="menu-button">⋮</button>
    </div>
    <br>
    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: account.progress + '%' }"></div>
    </div>
    <br>
    <div class="login-info">
      <h5>로그인 정보 공유</h5>
      <br>
      <div class="input-group">
        <label class="id">아이디</label>
        <span class="text">{{ username }}</span>
        <button class="copy-button" @click="copyToClipboard(username)">복사</button>
      </div>
      <div class="input-group">
        <label class="pwd">비밀번호</label>
        <span :class="['text', 'password']">
          <span v-if="isPasswordVisible">{{ password }}</span>
          <span v-else>●●●●●●●●</span>
        </span>
        <button class="eye-button" @click="togglePasswordVisibility">👁️</button>
      </div>
      <div v-if="isLeader">
        <button class="save-button" @click="saveLoginInfo">로그인 정보 저장</button>
      </div>
    </div>

    <div class="pay-button-container">
      <!-- 납부 버튼 -->
      <button class="pay-button" @click="payMyMembershipFee">이번 달 회비 납부하기</button>
    </div>

    <div class="member-status-container">
      <div class="member-status-header">
        <h5>이번 달 납부 현황</h5>
        <br>
        <button class="poke-button" @click="openModal">미납부자 찌르기</button>
      </div>
      <br>
      <div class="avatars">
        <div v-for="member in account.members" :key="member.id" class="avatar">
          <img
            :src="member.paymentStatus === 'paid' ? putonAvatarImage : noneAvatarImage"
            alt="member avatar"
          />
          <p>{{ member.name }}</p>
        </div>
      </div>
    </div>
    <br>
    <div class="payment-history">
      <h5>모임 통장 결제 내역</h5>
      <br>
      <div
        v-for="transaction in account.transactions"
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
    <br>
    <button class="leave-button">이 모임에서 나가기</button>
    <Footer />

    <div v-if="isModalOpen" class="modal-backdrop">
      <div class="modal" @click.stop>
        <h3>👉 미납부자 쿡쿡 찌르기</h3>
        <div v-if="isLeader">
          <p>어떤 팀원을 찌르시겠습니까?</p>
          <ul class="member-list">
            <li
              v-for="member in unpaidMembersExcludingSelf"
              :key="member.id"
              class="member-item"
            >
              <span class="member-name">{{ member.name }}</span>
              <button class="confirm-button" @click="pokeMember(member)">찌르기</button>
            </li>
          </ul>
        </div>
        <div v-else>
          <p>팀장을 찌르시겠습니까?</p>
          <button class="confirm-button" @click="pokeLeader">팀장 찌르기</button>
        </div>
        <button class="close-button" @click="closeModal">닫기</button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue';
import Footer from '@/components/common/Footer.vue';

// 이미지 파일 경로
const putonAvatarImage = new URL('../../assets/puton.png', import.meta.url).href;
const noneAvatarImage = new URL('../../assets/none.png', import.meta.url).href;

// 초기 데이터
const isLeader = ref(true);
const username = ref('ajm123');
const password = ref('mySecretPassword');
const isPasswordVisible = ref(false);

const account = ref({
  logo: new URL('../../assets/tving.png', import.meta.url).href,
  title: '6개월 티빙 모임',
  id: '45227485-25662',
  progress: 70,
  members: [
    { id: 1, name: '홍길동', paymentStatus: 'unpaid' },
    { id: 2, name: '김길동', paymentStatus: 'unpaid' },
    { id: 3, name: '장길동', paymentStatus: 'unpaid' },
    { id: 4, name: '조길동', paymentStatus: 'unpaid' },
  ],
  transactions: [
    { id: 1, name: 'TVING 결제', date: '2024.11.08 12:40', amount: '17000', isMain: true },
    { id: 2, name: '홍길동', date: '2024.11.07 12:40', amount: '4250', isMain: false },
    { id: 3, name: '박소연', date: '2024.11.07 12:40', amount: '4250', isMain: false },
    { id: 4, name: '김미연', date: '2024.11.07 12:40', amount: '4250', isMain: false },
  ],
});

// 함수 정의
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

// 본인만 납부 처리
const payMyMembershipFee = () => {
  const myMember = account.value.members.find((member) => member.id === 1); // 본인 식별
  if (myMember) {
    myMember.paymentStatus = 'paid';
    alert('이번 달 회비가 납부되었습니다.');
  }
};

// 모달 관리
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

// 미납부자 필터링
const unpaidMembersExcludingSelf = computed(() =>
  account.value.members.filter(
    (member) => member.id !== 1 && member.paymentStatus === 'unpaid'
  )
);

const pokeLeader = () => {
  alert('이 모임통장의 팀장을 쿡쿡 찔렀습니다!');
  closeModal();
};

const pokeMember = (member) => {
  alert(`${member.name}님을 쿡쿡 찔렀습니다!`);
  closeModal();
};
</script>



<style scoped>
.container {
  padding: 10px;
  background-color: #f9f9f9;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.logo {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.id {
  font-size: 0.7rem;
}

.pwd {
  font-size: 0.7rem;
}

.info {
  flex: 1;
  text-align: left;
}

.info h2 {
  font-size: 1rem;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info p {
  font-size: 0.75rem;
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.menu-button {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #888;
  cursor: pointer;
}

.progress-bar-container {
  background-color: #e0e0e0;
  border-radius: 10px;
  height: 6px;
  margin: 8px 0;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #ffa500;
  border-radius: 10px;
}

.login-info {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 15px;
}

.input-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.text {
  font-size: 0.85rem;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.copy-button,
.eye-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.7rem;
  color: #888;
}

.save-button {
  width: 100%;
  padding: 8px;
  background-color: #ffdc8b;
  color: #656363;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.pay-button-container {
  display: flex;
  justify-content: center;
  margin: 15px 0;
}

.pay-button {
  width: 90%;
  padding: 10px;
  background-color: #ffdc8b;
  color: #656363;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.password {
  font-size: 0.7rem;
}

.member-status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.member-status-container {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 15px;
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.payment-history {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 15px;
}

.transaction {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.transaction:last-child {
  border-bottom: none;
}

.transaction-info strong {
  font-weight: bold;
}

.transaction-info span {
  font-size: 0.75rem;
  color: #888;
}

.amount {
  font-weight: bold;
  font-size: 0.85rem;
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

.poke-button {
  background-color: #ff5252;
  color: white;
  border: none;
  padding: 6px 8px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.5rem;
}

.poke-button:hover {
  background-color: #ff0000;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  width: 280px;
  text-align: center;
}

.member-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.member-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.member-name {
  flex: 1;
  text-align: left;
  margin-right: 10px;
}

.confirm-button {
  background-color: #ff5252;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.confirm-button:hover {
  background-color: #ff0000;
}

.close-button {
  background-color: #ddd;
  border: none;
  padding: 6px 10px;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
}

@media (max-width: 480px) {
  .logo {
    width: 40px;
    height: 40px;
  }

  .info h2 {
    font-size: 0.9rem;
    text-align: center;
  }

  .info p {
    font-size: 0.7rem;
    text-align: center;
  }

  .menu-button {
    font-size: 1rem;
  }

  .text {
    font-size: 0.7rem;
  }

  .amount {
    font-size: 0.8rem;
  }

  .leave-button {
    font-size: 0.85rem;
  }
}

</style>


