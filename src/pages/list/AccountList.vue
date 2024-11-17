<template>
    <div class="account-list-container">
      <!-- 상단 필터와 검색 -->
      <header class="header">
        <img src="../../assets/logo.png" alt="안전모 로고" class="logo" />
        <div class="filter-search">
          <button class="filter-button">필터</button>
          <input type="text" placeholder="검색" class="search-input" />
          <button class="search-button">검색</button>
        </div>
      </header>
  
      <!-- 스크롤 가능한 리스트 -->
      <div class="account-scroll-container">
        <div class="account-card" v-for="(account, index) in accounts" :key="index">
          <img :src="account.logo" alt="통장 로고" class="account-logo" />
          <div class="account-info">
            <h3>{{ account.title }}</h3>
            <p>3인 기준 인당 <span class="amount">{{ account.price }}원</span></p>
            <p>{{ account.duration }}</p>
          </div>
          <span class="badge">📅 {{ account.date }}</span>
        </div>
      </div>
  
      <!-- 구독 추천 카드 -->
      <div class="recommendation-card">
        <h3>교육에 관심이 많은 당신을 위한<br />구독 서비스 추천</h3>
      </div>
  
      <!-- 방 만들기 버튼 -->
      <button class="create-room-button">방 만들기</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const accounts = ref([
    {
      logo: new URL("../../assets/tving.png", import.meta.url).href,
      title: "6개월 티빙 모여라",
      price: "4200",
      duration: "3개월",
      date: "매달 15일",
    },
    {
      logo: new URL("../../assets/tving.png", import.meta.url).href,
      title: "6개월 티빙 모여라",
      price: "4200",
      duration: "3개월",
      date: "매달 15일",
    },
    {
      logo: new URL("../../assets/tving.png", import.meta.url).href,
      title: "6개월 티빙 모여라",
      price: "4200",
      duration: "3개월",
      date: "매달 15일",
    },
  ]);
  </script>
  
  <style scoped>
  /* 컨테이너 */
  .account-list-container {
    padding: 20px;
    background-color: #f9f9f9;
  }
  
  /* 헤더 */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .logo {
    width: 80px;
  }
  
  .filter-search {
    display: flex;
    gap: 10px;
  }
  
  .filter-button,
  .search-button {
    background-color: #ffd700;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .search-input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  /* 스크롤 가능한 리스트 */
  .account-scroll-container {
    max-height: 300px;
    overflow-y: scroll;
    margin-bottom: 20px;
    padding-right: 10px;
  }
  
  .account-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    padding: 12px;
    margin-bottom: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .account-logo {
    width: 50px;
    height: 50px;
    border-radius: 8px;
  }
  
  .account-info {
    flex: 1;
    margin-left: 15px;
  }
  
  .account-info h3 {
    font-size: 1rem;
    margin: 0;
  }
  
  .account-info p {
    font-size: 0.85rem;
    color: #555;
  }
  
  .amount {
    color: #ff4500;
    font-weight: bold;
  }
  
  .badge {
    font-size: 0.8rem;
    background-color: #ffd700;
    color: white;
    padding: 4px 8px;
    border-radius: 10px;
  }
  
  /* 추천 카드 */
  .recommendation-card {
    background-color: #ffe599;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .recommendation-card h3 {
    font-size: 1rem;
    color: #333;
  }
  
  /* 방 만들기 버튼 */
  .create-room-button {
    display: block;
    width: 100%;
    padding: 15px;
    background-color: #fdbb2d;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    text-align: center;
  }
  </style>
  