<template>
    <nav class="footer-nav">
      <ul class="nav-list">
        <!-- 내 모임통장 -->
        <li class="nav-item">
          <router-link to="/account/home">
            <i class="icon-account">🏦</i>
            <span>내 모임통장</span>
          </router-link>
        </li>
  
        <!-- 방 찾기 -->
        <li class="nav-item">
          <router-link to="/accountlist">
            <i class="icon-search">🔍</i>
            <span>방 찾기</span>
          </router-link>
        </li>
  
        <!-- 마이페이지 -->
        <li class="nav-item">
          <router-link to="/mypage">
            <i class="icon-user">👤</i>
            <span>마이페이지</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: "Footer",
  };
  </script>
  
  <style scoped>
  .footer-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    border-top: 1px solid #ddd;
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    z-index: 1000;
  }
  
  .nav-list {
    display: flex;
    justify-content: space-around;
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .nav-item {
    text-align: center;
    flex: 1;
  }
  
  .nav-item a {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #333;
    text-decoration: none;
    padding: 5px 0;
    transition: background-color 0.3s ease;
  }
  
  .nav-item a:hover {
    background-color: #ffd700;
    border-radius: 8px;
  }
  
  .nav-item a .icon-account,
  .nav-item a .icon-search,
  .nav-item a .icon-user {
    font-size: 24px;
    margin-bottom: 5px;
  }
  
  .nav-item a span {
    font-size: 12px;
  }
  </style>
  