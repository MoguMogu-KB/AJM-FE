<template>
    <div class="main-container">
      <header class="header">
        <h1>안전모</h1>
      </header>
      <main>
        <div class="form-container">
          <div class="logo">
            <img src="/src/assets/helmet.png" alt="안전모 로고" class="logo-icon" />
            <h1>안전모</h1>
          </div>
          <form @submit.prevent="handleLogin" aria-label="로그인 폼">
            <div class="form-group">
              <label for="id">ID</label>
              <input
                type="text"
                id="id"
                v-model="userId"
                placeholder="ID를 입력하세요"
                required
                aria-label="아이디 입력"
              />
            </div>
            <div class="form-group">
              <label for="password">비밀번호</label>
              <input
                type="password"
                id="password"
                v-model="password"
                placeholder="비밀번호를 입력하세요"
                required
                aria-label="비밀번호 입력"
              />
            </div>
            <button type="submit" class="login-btn" aria-label="로그인 버튼">로그인</button>
          </form>
          <div class="signup">
            <router-link to="/signup" aria-label="회원가입 페이지로 이동">회원가입</router-link>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const userId = ref("");
  const password = ref("");
  
  const handleLogin = () => {
    if (!userId.value || !password.value) {
      alert("ID와 비밀번호를 입력해주세요!");
      return;
    }
    // 로그인 로직 처리 (예: API 요청)
    console.log("로그인 시도:", { userId: userId.value, password: password.value });
  };
  </script>
  
  <style scoped>
  /* 기본 레이아웃 */
  .main-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f9f9f9;
    font-family: Arial, sans-serif;
  }
  
  .header {
    background-color: #f4b400;
    color: white;
    text-align: center;
    padding: 16px 0;
    font-size: 24px;
    font-weight: bold;
  }
  
  main {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .form-container {
    width: 400px;
    padding: 24px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .logo {
    margin-bottom: 20px;
  }
  
  .logo-icon {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
  
  h1 {
    font-size: 28px;
    font-weight: bold;
    color: #f4b400;
    margin: 0;
  }
  
  form {
    margin-top: 20px;
  }
  
  .form-group {
    margin-bottom: 16px;
    text-align: left;
  }
  
  label {
    display: block;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }
  
  input:focus {
    outline: none;
    border-color: #f4b400;
  }
  
  .login-btn {
    width: 100%;
    padding: 12px 0;
    background-color: #f4b400;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .login-btn:hover {
    background-color: #e5a300;
  }
  
  .signup {
    margin-top: 16px;
    font-size: 14px;
  }
  
  .signup a {
    color: #f4b400;
    text-decoration: none;
    font-weight: bold;
  }
  
  .signup a:hover {
    text-decoration: underline;
  }
  
  /* 반응형 디자인 */
  @media (max-width: 768px) {
    .form-container {
      width: 90%;
      padding: 16px;
    }
  
    h1 {
      font-size: 24px;
    }
  
    input {
      font-size: 14px;
    }
  
    .login-btn {
      font-size: 16px;
    }
  }
  
  @media (min-width: 1024px) {
    .form-container {
      max-width: 500px;
    }
  
    h1 {
      font-size: 32px;
    }
  }
  </style>
  