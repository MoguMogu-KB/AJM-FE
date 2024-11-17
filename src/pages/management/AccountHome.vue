<template>
  <div class="container">
    <h2>나의 모임통장</h2>

    <div
      class="card"
      v-for="(account, index) in accounts"
      :key="index"
      :class="{ 'inactive-card': !account.isActive }"
      @click="navigateToDetail(account)"
    >
      <div class="card-header">
        <img :src="account.logo" alt="모임 로고" class="logo" />
        <div class="card-info">
          <h3>{{ account.title }}</h3>
          <p>{{ account.id }}</p>
        </div>
        <!-- account.period가 있을 때만 배지를 표시 -->
        <span v-if="account.period" class="badge">{{ account.period }}</span>
        <button class="menu-button">⋮</button>
      </div>

      <div class="progress-bar-container">
        <div
          class="progress-bar"
          :style="{ width: account.progress + '%' }"
          v-if="account.isActive"
        ></div>
      </div>

      <p class="duration">{{ account.duration }}</p>
      <p class="participants">
        {{ account.isActive ? `현재 ${account.participants}명 참여 중` : '비활성화됨' }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 현재 사용자 역할 설정 (팀장 또는 팀원)
const currentUserRole = ref('팀장') // '팀장' or '팀원'

const accounts = ref([
  {
    id: 'tving',
    logo: new URL('../../assets/tving.png', import.meta.url).href,
    title: '6개월 티빙 모임',
    idDetail: '45227485-25662',
    period: '팀장',
    progress: 70,
    duration: '6개월',
    participants: 4,
    isActive: true
  },
  {
    id: 'malhaevoca',
    logo: new URL('../../assets/malhaevoca.png', import.meta.url).href,
    title: '말해보카로 영어공부',
    idDetail: '120295485-45452',
    period: '팀원',
    progress: 50,
    duration: '1년',
    participants: 2,
    isActive: true
  },
  {
    id: 'wavve',
    logo: new URL('../../assets/wavve.png', import.meta.url).href,
    title: '한 달 웨이브 모여라',
    idDetail: '458987485-78662',
    period: '팀장',
    progress: 30,
    duration: '3개월',
    participants: 1,
    isActive: false
  }
])

const navigateToDetail = (account) => {
  // 비활성화된 카드에 접근하려는 경우
  if (!account.isActive) {
    if (currentUserRole.value === '팀장') {
      // 팀장은 접근 가능
      router.push({ name: 'AccountDetail', params: { id: account.id } })
    } else {
      // 팀원은 접근 불가
      alert('비활성화된 모임입니다.')
    }
  } else {
    // 활성화된 카드에는 모두 접근 가능
    router.push({ name: 'AccountDetail', params: { id: account.id } })
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
}

h2 {
  font-size: 1.5rem;
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
  width: 50px;
  height: 50px;
  margin-right: 20px;
  border-radius: 10px;
}

.card-info {
  flex: 1;
}

.card-info h3 {
  font-size: 1rem;
  margin: 0;
}

.card-info p {
  font-size: 0.85rem;
  color: #555;
}

.badge {
  font-size: 0.75rem;
  background-color: #ffd700;
  color: #fff;
  padding: 2px 8px;
  border-radius: 10px;
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
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #ffa500;
  border-radius: 10px;
}

.duration {
  font-size: 0.85rem;
  color: #888;
  margin-top: 4px;
  text-align: right;
}

.participants {
  font-size: 0.85rem;
  color: #888;
  text-align: right;
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
</style>
