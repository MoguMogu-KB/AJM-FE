<template>
    <div class="signup-container">
      <header class="header">
        <img src="/src/assets/helmet.png" alt="안전모 로고" class="logo-icon" />
        <h1>반가워요, 안전한 구독 모임통장 서비스 <span>안전모</span>에 오신 것을 환영합니다.</h1>
      </header>
      <main class="form-container">
        <form @submit.prevent="handleSignUp">
          <div class="form-group">
            <label for="name">이름</label>
            <input
              type="text"
              id="name"
              v-model="name"
              placeholder="이름을 입력하세요"
              required
            />
          </div>
          <div class="form-group">
            <label for="id">아이디</label>
            <div class="id-check-container">
              <input
                type="text"
                id="id"
                v-model="userId"
                placeholder="아이디를 입력하세요"
                required
              />
              <button type="button" @click="checkId" class="check-id-btn">중복 확인</button>
            </div>
          </div>
          <div class="form-group">
            <label for="password">비밀번호</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          <div class="terms-container">
            <label>
              <input type="checkbox" v-model="agreedToTerms" />
              약관에 동의합니다.
            </label>
            <textarea
              class="terms-text"
              readonly
              value="약관 약관 약관 읽어라읽어라 읽어라 으아아아아아아아아아아아아아 해커톤 화이팅팅티딩 탱탱태댕 팅팅탱탱
              후라이팬케이크레이지 아케이드루이드럼세탁기술가정신분열정열맨홀뚜껑."
            ></textarea>
          </div>
          <button type="submit" class="next-btn" :disabled="!agreedToTerms"
          @click="goToNext">다음</button>
        </form>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  const router = useRouter();
  const name = ref("");
  const userId = ref("");
  const password = ref("");
  const agreedToTerms = ref(false);
  
  const handleSignUp = () => {
    if (!name.value || !userId.value || !password.value) {
      alert("모든 필드를 입력해주세요!");
      return;
    }
    if (!agreedToTerms.value) {
      alert("약관에 동의하셔야 회원가입이 가능합니다.");
      return;
    }
    // 회원가입 API 요청
    console.log("회원가입 데이터:", {
      name: name.value,
      userId: userId.value,
      password: password.value,
    });
  };
  
  const checkId = () => {
    // ID 중복 확인 로직 (예: API 요청)
    console.log("ID 중복 확인 요청:", userId.value);
    alert("사용 가능한 아이디입니다.");
  };
  const goToNext = () => {
  // if (!year.value || !month.value || !day.value || !gender.value) {
  //   alert("모든 정보를 입력해주세요!");
  //   return;
  // }

  // 데이터 저장 후 다음 페이지로 이동
  router.push("/birth-gender");
};
  </script>
  
  <style scoped>
  .signup-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f9f9f9;
    font-family: Arial, sans-serif;
  }
  
  .header {
    text-align: center;
    padding: 16px;
    color: #333;
  }
  
  .logo-icon {
    width: 50px;
    margin-bottom: 16px;
  }
  
  .header h1 {
    font-size: 18px;
    font-weight: normal;
    line-height: 1.5;
  }
  
  .header span {
    font-weight: bold;
    color: #f4b400;
  }
  
  .form-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
  }
  
  form {
    width: 100%;
    max-width: 400px;
    background: white;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 16px;
    text-align: left;
  }
  
  label {
    display: block;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
    color: #333;
  }
  
  input {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .id-check-container {
    display: flex;
    gap: 8px;
  }
  
  .check-id-btn {
    padding: 10px;
    font-size: 14px;
    background-color: #f4b400;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .terms-container {
    margin: 16px 0;
    text-align: left;
  }
  
  .terms-text {
    width: 100%;
    height: 100px;
    font-size: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px;
    margin-top: 8px;
    resize: none;
  }
  
  .next-btn {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    background-color: #f4b400;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 16px;
  }
  
  .next-btn:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
  </style>
  