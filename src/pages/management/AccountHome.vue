<template>
    <div class="container">
      <h2>나의 모임통장</h2>
  
      <div
        class="card"
        v-for="(account, index) in accounts"
        :key="index"
        @click="navigateToDetail(account.id)"
      >
        <div class="card-header">
          <img :src="account.logo" alt="모임 로고" class="logo" />
          <div class="card-info">
            <h3>{{ account.title }}</h3>
            <p>{{ account.id }}</p>
          </div>
          <span class="badge">{{ account.period }}</span>
          <button class="menu-button">⋮</button>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar" :style="{ width: account.progress + '%' }"></div>
        </div>
        <p class="duration">{{ account.duration }}</p>
        <p class="participants">현재 {{ account.participants }}명 참여 중</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const accounts = ref([
    {
      logo: './assets/tving-logo.png',
      title: '6개월 티빙 모임',
      id: '45227485-25662',
      period: '팀장',
      progress: 70,
      duration: '6개월',
      participants: 4
    },
    {
      logo: './assets/kakao-logo.png',
      title: '말해보카로 영어공부',
      id: '120295485-45452',
      period: '',
      progress: 50,
      duration: '1년',
      participants: 2
    },
    {
      logo: './assets/wave-logo.png',
      title: '한 달 웨이브 모여라',
      id: '458987485-78662',
      period: '',
      progress: 30,
      duration: '',
      participants: 1
    }
  ])
  
  const navigateToDetail = (id) => {
    router.push({ name: 'AccountDetail', params: { id } })
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
    margin-right: 16px;
    border-radius: 10px;
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
  }
  
  .participants {
    font-size: 0.85rem;
    color: #888;
    text-align: right;
  }
  </style>
  
  