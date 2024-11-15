<template>
    <div class="container">
      <br>
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
        <h3>로그인 정보 공유</h3>
        <br>
        <div class="input-group">
          <label>아이디&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <span class="text">{{ username }}</span>
          <button class="copy-button" @click="copyToClipboard(username)">📋</button>
        </div>
        <div class="input-group">
          <label>비밀번호&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <span :class="['text', 'password']">
            <span v-if="isPasswordVisible">{{ password }}</span>
            <span v-else>●●●●●●●●</span>
          </span>
          <button class="eye-button" @click="togglePasswordVisibility">👁️</button>
        </div>
      </div>
  
      <button class="pay-button">이번 달 회비 납부하기</button>
  
      <div class="member-status-container">
        <h3>이번 달 납부 현황</h3>
        <br>
        <div class="avatars">
          <div v-for="member in account.members" :key="member.id" class="avatar">
            <img :src="avatarImage" alt="member avatar" />
            <p>{{ member.name }}</p>
          </div>
        </div>
      </div>
  
      <div class="payment-history">
        <h3>모임 통장 결제 내역</h3>
        <br>
        <div v-for="transaction in account.transactions" :key="transaction.id" class="transaction">
          <div class="transaction-info">
            <strong>{{ transaction.name }}</strong>
            <span>{{ transaction.date }}</span>
          </div>
          <span :class="{ amount: true, highlight: transaction.isMain }">{{ transaction.amount }} 원</span>
        </div>
      </div>
  
      <button class="leave-button">이 모임에서 나가기</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const username = ref('ajm123')
  const password = ref('mySecretPassword')

  const isPasswordVisible = ref(false)
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('아이디가 복사되었습니다.')
    }).catch(err => {
      console.error('복사 실패:', err)
    })
  }
  
  const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value
  }
  
  const account = ref({
    logo: new URL('../../assets/tving.png', import.meta.url).href,
    title: '6개월 티빙 모임',
    id: '45227485-25662',
    progress: 70,
    members: [
      { id: 1, name: '홍길동' },
      { id: 2, name: '김길동' },
      { id: 3, name: '장길동' },
      { id: 4, name: '조길동' }
    ],
    transactions: [
      { id: 1, name: 'TVING 결제', date: '2024.11.08 12:40', amount: '17000', isMain: true },
      { id: 2, name: '홍길동', date: '2024.11.07 12:40', amount: '4250', isMain: false },
      { id: 3, name: '박소연', date: '2024.11.07 12:40', amount: '4250', isMain: false },
      { id: 4, name: '김미연', date: '2024.11.07 12:40', amount: '4250', isMain: false }
    ]
  })
  
  const avatarImage = new URL('../../assets/puton.png', import.meta.url).href
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
  
  .progress-text {
    position: absolute;
    right: 10px;
    top: -10px;
    font-size: 0.85rem;
    color: #888;
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
  
  .label {
    font-size: 1rem;
    color: #555;
    margin-right: 10px;
  }
  
  .text {
    font-size: 1rem;
    color: #333;
    flex: 1;
    margin-right: 10px;
  }
  
  .password {
    border: none;
    padding: 0;
  }
  
  .copy-button,
  .eye-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    color: #888;
  }
  
  .pay-button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #ffefc7;
    color: #555;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    margin-bottom: 20px;
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
    padding: 5px 0;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .transaction-info {
    display: flex;
    flex-direction: column;
  }
  
  .amount {
    font-weight: bold;
  }
  
  .highlight {
    color: #ff4500;
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
    font-weight: bold;
  }
  </style>
  