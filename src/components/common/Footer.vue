<template>
  <div 
    class="footer-wrapper"
    @mouseover="isVisible = true"
    @mouseleave="isVisible = false"
  >
    <nav class="footer-nav" :class="{ 'footer-hidden': !isVisible }">
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
  </div>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {
      isVisible: false, // Footer 표시 여부를 제어
    };
  },
};
</script>

<style scoped>
.footer-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.footer-nav {
  background-color: #fff;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.footer-hidden {
  transform: translateY(100%); /* Footer를 화면 아래로 숨김 */
  opacity: 0;
  pointer-events: none; /* 숨겨진 상태에서 클릭 방지 */
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

