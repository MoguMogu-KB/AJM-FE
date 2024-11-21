<template>
  <div class="container">
    <h2>나의 모임통장</h2>

    <div class="card" v-for="(account, index) in accounts" :key="index" :class="{ 'inactive-card': !account.isActive }"
      @click="handleCardClick(account)">
      <div class="card-header">
        <img :src="account.logo" alt="모임 로고" class="logo" />
        <div class="card-info">
          <h3>{{ account.title }}</h3>
          <p>{{ account.accountNum }}</p>
        </div>
        <span v-if="account.role" class="badge">{{ account.role }}</span>
        <button class="menu-button">⋮</button>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: account.progress + '%' }" v-if="account.isActive"></div>
      </div>

      <p class="dueDate">{{ account.dueDate }}개월</p>
      <p class="participants">
        {{ account.isActive ? `현재 ${account.participants}명 참여 중` : '비활성화됨' }}
      </p>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'; // onMounted 추가
import { useRouter } from 'vue-router';
import axios from 'axios';
import Footer from '@/components/common/Footer.vue';

const router = useRouter();

const accounts = ref([
  {
    id: 'tving',
    roomNum: 1,
    logo: new URL('../../assets/tving.png', import.meta.url).href,
    title: '6개월 티빙 모임',
    accountNum: '45227485-25662',
    progress: 70,
    dueDate: 6,
    participants: 4,
    isActive: true,
    role: '팀원',
  },
  {
    id: 'malhaevoca',
    roomNum: 2,
    logo: new URL('../../assets/malhaevoca.png', import.meta.url).href,
    title: '말해보카로 영어공부',
    accountNum: '120295485-45452',
    progress: 50,
    dueDate: 12,
    participants: 2,
    isActive: true,
    role: '팀원',
  },
  {
    id: 'wavve',
    roomNum: 3,
    logo: new URL('../../assets/wavve.png', import.meta.url).href,
    title: '한 달 웨이브 모여라',
    accountNum: '458987485-78662',
    progress: 30,
    dueDate: 3,
    participants: 1,
    isActive: false,
    role: '팀원',
  },
]);

const getUserSharingAccount = async () => {
  const userId = localStorage.getItem("userId");
  try {
    const accountResponse = await axios.get("https://7f96-14-36-176-7.ngrok-free.app/account/sharingAccount",
      {
        params: { userId: userId },
        headers: { 'ngrok-skip-browser-warning': '69420' }
      }
    );

    const accountNum = accountResponse.data;
    localStorage.setItem("accountNum", accountNum);
  } catch (error) {
    console.error("사용자 모임통장 계좌 불러오기:", error);
    alert("사용자 계좌 불러오기 중 오류가 발생했습니다.");
  }
};

const fetchAccounts = async () => {
  const userId = localStorage.getItem("userId"); // 사용자 ID 가져오기
  try {
    const response = await axios.get("https://7f96-14-36-176-7.ngrok-free.app/room/user", {
      params: { userId: userId },
      headers: { 'ngrok-skip-browser-warning': '69420' }
    });
    const newAccounts = response.data.map((room) => ({
      roomNum: room.roomNum,
      logo: getLogoByCategory(room.category), // 카테고리에 따라 로고 설정
      title: room.title,
      accountNum: room.accountNumber,
      progress: 0,// 진행률 계산
      dueDate: room.dueDate,
      participants: 1, // 현재 참여자 수
      isActive: true, // 활성 상태 설정
      role: "팀장", // 필요 시 role 추가
    }));
    accounts.value = [...accounts.value, ...newAccounts]; // 기존 데이터와 병합
  } catch (error) {
    console.error("Failed to fetch room accounts:", error);
    alert("모임 정보를 불러오는 중 오류가 발생했습니다.");
  }
};

const fetchSurvey = async () => {
  const userId = localStorage.getItem("userId"); // 사용자 ID 가져오기
  try {
    const response = await axios.get(`https://7f96-14-36-176-7.ngrok-free.app/user/survey/${userId}`, {
      headers: { 'ngrok-skip-browser-warning': '69420' }
    });
    console.log(response);
    const ottServices = response.data.ottServices;
    const subscriptionType = response.data.subscriptionType;

    localStorage.setItem("ottServices", ottServices);
    localStorage.setItem("subscriptionType", subscriptionType);

  } catch (error) {
    console.error("Failed to fetch room accounts:", error);
    alert("모임 정보를 불러오는 중 오류가 발생했습니다.");
  }
};

// 카테고리별 로고를 반환하는 헬퍼 함수
const getLogoByCategory = (category) => {
  const logos = {
    "넷플릭스": new URL('../../assets/netflix.png', import.meta.url).href,
    "티빙": new URL('../../assets/tving.png', import.meta.url).href,
    "디즈니플러스": new URL('../../assets/disney.png', import.meta.url).href,
    "애플 뮤직": new URL('../../assets/apple.png', import.meta.url).href,
    "스포티파이": new URL('../../assets/spotify.png', import.meta.url).href
    // 필요한 카테고리에 따라 로고 추가
  };
  return logos[category] || new URL('../../assets/default.png', import.meta.url).href;
};

// 페이지 로드 시 getUserSharingAccount 실행
onMounted(() => {
  getUserSharingAccount();
  fetchAccounts();
  fetchSurvey();
});

const handleCardClick = (account) => {
  if (!account.isActive) {
    if (account.role === '팀장') {
      alert('팀장 권한으로 비활성화된 모임에 접근합니다.');
      router.push({
        name: 'AccountDetail',
        params: { id: account.id },
        query: { ...account },
      });
    } else {
      alert('비활성화된 모임입니다. 접근할 수 없습니다.');
    }
  } else {
    localStorage.setItem("roomAccountNum", account.accountNum);
    localStorage.setItem("roomNum", account.roomNum);
    router.push({
      name: 'AccountDetail',
      params: { id: account.id },
      query: { ...account },
    });
  }
};
</script>


<style scoped>
.container {
  padding: 20px;
}

h2 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.card {
  background-color: #f9f9f9;
  border-radius: 15px;
  padding: 16px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-3px);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  width: 45px;
  height: 45px;
  margin-right: 15px;
  border-radius: 10px;
}

.card-info {
  flex: 1;
}

.card-info h3 {
  font-size: 0.85rem;
  margin: 0;
  white-space: nowrap;
  /* 한 줄 유지 */
  overflow: hidden;
  /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis;
  /* 생략표 처리 */
}

.card-info p {
  font-size: 0.75rem;
  color: #555;
  white-space: nowrap;
  /* 한 줄 유지 */
  overflow: hidden;
  /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis;
  /* 생략표 처리 */
}

.badge {
  font-size: 0.7rem;
  background-color: #ffd700;
  color: #fff;
  padding: 2px 6px;
  border-radius: 10px;
  white-space: nowrap;
  /* 한 줄 유지 */
  overflow: hidden;
  /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis;
  /* 생략표 처리 */
}

.menu-button {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #888;
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

.dueDate {
  font-size: 0.75rem;
  color: #888;
  margin-top: 4px;
  text-align: right;
  white-space: nowrap;
  /* 한 줄 유지 */
  overflow: hidden;
  /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis;
  /* 생략표 처리 */
}

.participants {
  font-size: 0.75rem;
  color: #888;
  text-align: right;
  white-space: nowrap;
  /* 한 줄 유지 */
  overflow: hidden;
  /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis;
  /* 생략표 처리 */
}

/* 비활성화된 카드 스타일 */
.inactive-card {
  background-color: #f0f0f0;
  color: #aaa;
  cursor: not-allowed;
  box-shadow: none;
}

.inactive-card .progress-bar {
  display: none;
}

.inactive-card:hover {
  transform: none;
}

/* 모바일 환경에서 추가 크기 조정 */
@media (max-width: 480px) {
  h2 {
    font-size: 1.2rem;
  }

  .card-info h3 {
    font-size: 0.8rem;
  }

  .card-info p {
    font-size: 0.7rem;
  }

  .badge {
    font-size: 0.65rem;
    padding: 1px 5px;
  }

  .dueDate,
  .participants {
    font-size: 0.7rem;
  }

  .logo {
    width: 40px;
    height: 40px;
  }

  .menu-button {
    font-size: 1rem;
  }
}
</style>
