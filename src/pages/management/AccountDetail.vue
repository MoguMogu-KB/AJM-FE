<template>
  <div class="container">
    <div class="header">
      <img :src="getCategoryImage(account.category)" alt="모임 로고" class="logo" />
      <div class="info">
        <h2>{{ account.title }}</h2>
        <p>{{ account.id }}</p>
        <!-- <p>{{ account.category }}</p> -->
      </div>
      <button class="menu-button">⋮</button>
    </div>
    <br>
    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: account.progress + '%' }"></div>
    </div>
    <br>

    <!-- 로그인 정보 공유 -->
    <div class="login-info">
      <h5>로그인 정보 공유</h5>
      <br>
      <div class="input-group">
        <label class="id">아이디</label>
        <!-- 아이디가 수정모드일 때 input으로 변경 -->
        <template v-if="isEditMode">
          <input v-model="username" type="text" class="text-input" />
        </template>
        <template v-else>
          <span class="text-input">{{ username }}</span>
        </template>
      </div>
      <div class="input-group">
        <label class="pwd">비밀번호</label>
        <!-- 비밀번호가 수정모드일 때 input으로 변경 -->
        <template v-if="isEditMode">
          <input v-model="password" type="password" class="text-input" />
        </template>
        <template v-else>
          <span class="text-input">{{ isPasswordVisible ? password : '•'.repeat(password.length) }}</span>
          <button class="eye-button" @click="togglePasswordVisibility">👁️</button>
        </template>
      </div>
      <div v-if="isLeader">
        <!-- 수정 버튼을 클릭하면 isEditMode를 변경 -->
        <button class="save-button" @click="toggleEditMode">{{ isEditMode ? '저장' : '수정' }}</button>
      </div>
    </div>

    <!-- 기존 화면 유지 -->
    <div class="pay-button-container">
      <button class="pay-button" @click="() => { payMyMembershipFee(); updatePaymentState(); }">이번 달 회비 납부하기</button>
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
          <img :src="member.payment === 1 ? putonAvatarImage : noneAvatarImage" alt="member avatar" />
          <p>{{ member.name }}</p>
        </div>
      </div>
    </div>
    <br>
    <div class="payment-history">
      <h5>모임 통장 결제 내역</h5>
      <br>
      <div v-for="transaction in account.transactions" :key="transaction.id" class="transaction">
        <div class="transaction-info">
          <strong>{{ transaction.name }}</strong><br />
          <span>{{ transaction.date }}</span>
        </div>
        <span :class="{ 'highlight-blue': transaction.amount > 0, 'highlight-red': transaction.amount < 0 }">
          {{ formatAmount(transaction.amount) }} 원
        </span>
      </div>
    </div>
    <br>
    <button class="leave-button">이 모임에서 나가기</button>
    <Footer />


    <div v-if="isModalOpen" class="modal-backdrop">
      <div class="modal" @click.stop>
        <h3>미납부자 쿡쿡 찌르기</h3>
        <div v-if="isLeader">
          <p>어떤 팀원을 찌르시겠습니까?</p><br>
          <ul>
            <li v-for="(member, index) in unpaidMembers" :key="index" class="member-item">
              <span>{{ member }}</span>
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
import axios from 'axios';
import { ref, computed } from 'vue';
import Footer from '@/components/common/Footer.vue';


const putonAvatarImage = new URL('../../assets/puton.png', import.meta.url).href;
const noneAvatarImage = new URL('../../assets/none.png', import.meta.url).href;

const isLeader = ref(true);
const roomNum = ref('');
const username = ref('');
const password = ref('');
const isPasswordVisible = ref(false);
const isEditMode = ref(false);

const unpaidMembers = ref([]);    // 팀원 목록 저장
const isModalOpen = ref(false);   // 모달


const account = ref({
  logo: '',
  title: '',
  id: '',
  category: '',
  date: '',
  progress: 70,
  members: [],
  transactions: [],
});

// account.category에 따라 이미지를 반환하는 함수
const getCategoryImage = (category) => {
  if (category === '넷플릭스') {
    return new URL('../../assets/netfelix.png', import.meta.url).href;
  } else if (category === '티빙') {
    return new URL('../../assets/tving.png', import.meta.url).href;
  }
  // 기본 이미지 (기본값을 설정)
  return new URL('../../assets/default.png', import.meta.url).href;
};


// 수정 모드 토글 함수
const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value;
  if (!isEditMode.value) {
    addAccount();
  }
};

// 방 기본 정보 API 호출
const fetchRoomBasicInfo = async () => {
  try {
    const roomNum = localStorage.getItem('roomNum');
    const response = await axios.get(`https://7f96-14-36-176-7.ngrok-free.app/api/roomdetails/basic-info?roomNum=${roomNum}`,{
      headers: { 'ngrok-skip-browser-warning': '69420' }
    });

    // API 응답 데이터로 account 객체 업데이트
    account.value.title = response.data.title;
    account.value.category = response.data.subscriptionType;
    account.value.date = response.data.fundraisingDate;

    account.value.id = localStorage.getItem('roomAccountNum');
  } catch (error) {
    console.error('Error fetching room basic info:', error);
  }
};

fetchRoomBasicInfo();

// 구독 계정 정보
const fetchSubscriptionAccountInfo = async () => {
  const roomNum = localStorage.getItem('roomNum');
  try {
    const response = await axios.get(`https://7f96-14-36-176-7.ngrok-free.app/api/roomdetails/subscription-account?roomNum=${roomNum}`,{
      headers: { 'ngrok-skip-browser-warning': '69420' }
    });
    const subscriptionAccount = response.data;

    username.value = subscriptionAccount.accountId;
    password.value = subscriptionAccount.accountPassword;
  } catch (error) {
    console.error('구독 계정 정보를 가져오는 데 실패했습니다.', error);
  }
};

fetchSubscriptionAccountInfo(roomNum.value);

// 팀원 목록 출력
const fetchMembers = async () => {
  const roomNum = localStorage.getItem('roomNum');

  try {
    const response = await axios.get(`https://7f96-14-36-176-7.ngrok-free.app/api/roomdetails/participants?roomNum=${roomNum}`,
      {
        headers: { 'ngrok-skip-browser-warning': '69420' }
      }
    );

    account.value.members = response.data.map(member => ({
      name: member.name,
      role: member.role,
      payment: member.payment
    }));
  } catch (error) {
    console.error('팀원 목록을 가져오는 데 실패했습니다.', error);
  }
};

// 거래 내역 출력
const fetchTransactions = async () => {
  const accountNumber = localStorage.getItem('roomAccountNum');

  try {
    const response = await axios.get(`https://7f96-14-36-176-7.ngrok-free.app/api/roomdetails/account-transactions?accountNumber=${accountNumber}`,{
      headers: { 'ngrok-skip-browser-warning': '69420' }
    });

    account.value.transactions = response.data.map(transaction => ({
      id: transaction.id,
      name: transaction.transactionDetails,
      date: transaction.transactionTime,
      amount: transaction.amount
    }));
  } catch (error) {
    console.error('거래 내역을 가져오는 데 실패했습니다.', error);
  }
};

// 금액 천 단위로 쉼표 출력
const formatAmount = (amount) => {
  return amount.toLocaleString('ko-KR');
};

// 회비 납부
const payMyMembershipFee = async () => {
  const accountNumber = localStorage.getItem('roomAccountNum')
  const transactionDetails = localStorage.getItem('userName')
  const amount = 10000;                  // 실제 값 대입 필요

  try {
    const response = await axios.post("https://7f96-14-36-176-7.ngrok-free.app/api/roomdetails/add-transaction", null,
      {
        params: {
          accountNumber,
          transactionDetails,
          amount,
        },
      }
    );

    if (response.status === 200 && response.data.includes("Payment Successfully")) {
      alert("회비 납부가 성공적으로 완료되었습니다.");
      await updatePaymentState();    // 납부 상태 업데이트
      await fetchTransactions();     // 거래 내역 새로 고침
      await fetchMembers();          // 팀원 목록 새로 고침
      window.location.reload();      // 페이지 새로 고침
    } else {
      alert("회비 납부에 실패했습니다. 다시 시도해주세요.");
    }
  } catch (error) {
    console.error("회비 납부 요청 중 오류 발생:", error);
    alert("서버와의 통신 중 오류가 발생했습니다.");
  }
};

// 납부 상태 업데이트
const updatePaymentState = async () => {
  const requestData = {
    roomNum: localStorage.getItem('roomNum'),
    id: localStorage.getItem('userId')
  };

  try {
    const response = await axios.put("https://7f96-14-36-176-7.ngrok-free.app/api/roomdetails/update/payment/state", requestData);

    if (response.status === 200) {
      console.log("납부 상태가 성공적으로 업데이트되었습니다.");
    } else {
      console.error("납부 상태 업데이트 실패.");
    }
  } catch (error) {
    console.error("납부 상태 업데이트 중 오류 발생:", error);
  }
};

fetchMembers();
fetchTransactions();

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

const addAccount = async () => {
  const roomNum = localStorage.getItem('roomNum');

  const apiUrl = `https://7f96-14-36-176-7.ngrok-free.app/api/roomdetails/update-account`;

  try {
    const response = await axios.put(apiUrl, {
      roomNum: roomNum,
      subscribeId: username.value.trim(),
      subscribePwd: password.value.trim(),
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      alert('구독 계정 정보가 성공적으로 변경되었습니다.');
    } else {
      alert('저장 실패. 다시 시도해주세요.');
    }
  } catch (error) {
    alert('서버와의 통신에 실패했습니다.');
  }
};

const openModal = () => {
  fetchUnpaidMembers();
  isModalOpen.value = true;
};
const closeModal = () => {
  isModalOpen.value = false;
};

// 미납부자 목록 가져오기
const fetchUnpaidMembers = async () => {
  const roomNum = localStorage.getItem('roomNum');

  try {
    const response = await axios.get(`https://7f96-14-36-176-7.ngrok-free.app/api/roomdetails/member/list?roomNum=${roomNum}`,{
      headers: { 'ngrok-skip-browser-warning': '69420' }
    });
    unpaidMembers.value = response.data;
  } catch (error) {
    console.error('팀원 목록 가져오기에 실패했습니다.', error);
  }
};


const unpaidMembersExcludingSelf = computed(() =>
  account.value.members.filter(
    (member) => member.id !== 1 && member.paymentStatus === 'unpaid',
  ),
);

const pokeLeader = () => {
  alert('팀장을 찔렀습니다!');
  closeModal();
};

const pokeMember = async (member) => {
  try {
    const response = await axios.post(`https://7f96-14-36-176-7.ngrok-free.app/user/add-warning`, null, {
      params: {
        name: member
      }
    });

    if (response.data.includes(`Warning count increased for user: ${member}`)) {
      alert(`${member}님 찌르기에 성공했습니다.`);
    } else {
      alert(`${member}님 찌르기에 실패했습니다.`);
    }
    console.log(response.data);
    closeModal();
  } catch (error) {
    console.error(`${member}님 찌르기 요청 실패:`, error);
    alert(`${member}님 찌르기에 실패했습니다.`);
  }
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
  max-height: 300px;
  /* 스크롤 높이 제한 */
  overflow-y: auto;
  /* 스크롤 활성화 */
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