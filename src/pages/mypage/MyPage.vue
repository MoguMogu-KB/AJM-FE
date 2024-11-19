<template>
  <div class="mypage-container">
    <h1>마이페이지</h1>
    <form @submit.prevent="submitForm" class="mypage-form">
      <div class="form-group">
        <label for="name">이름</label>
        <input id="name" v-model="formData.name" type="text" disabled />
      </div>
      <div class="form-group">
        <label for="id">아이디</label>
        <input id="id" v-model="formData.id" type="text" disabled />
      </div>
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input id="password" v-model="formData.password" type="password" />
      </div>
      <div class="form-group">
        <label for="new-password">새 비밀번호</label>
        <input id="new-password" v-model="formData.newPassword" type="password" />
      </div>
      <div class="form-group">
        <label>생년월일</label>
        <div class="birthday-group">
          <input v-model="formData.birthdayYear" type="text" placeholder="YYYY" maxlength="4" disabled />
          <span>-</span>
          <input v-model="formData.birthdayMonth" type="text" placeholder="MM" maxlength="2" disabled />
          <span>-</span>
          <input v-model="formData.birthdayDay" type="text" placeholder="DD" maxlength="2" disabled />
        </div>
      </div>
      <div class="form-group">
        <label for="email">이메일</label>
        <div class="email-group">
          <input id="email" v-model="formData.email" type="text" placeholder="이메일 입력" />
          <span>@</span>
          <select v-model="formData.emailDomain">
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="daum.net">daum.net</option>
          </select>
        </div>
      </div>
      <button type="submit" class="submit-button">수정하기</button>
    </form>
    <Footer />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import Footer from '@/components/common/Footer.vue';

const formData = reactive({
  name: '홍길동',
  id: 'user123',
  password: '',
  newPassword: '',
  birthdayYear: '1991',
  birthdayMonth: '07',
  birthdayDay: '21',
  email: '',
  emailDomain: 'gmail.com'
})

const submitForm = () => {
  alert('수정이 완료되었습니다!')
}
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: Arial, sans-serif;
}

.mypage-container {
  width: 100%; 
  max-width: 375px; 
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
}

.mypage-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-size: 1rem;
  margin-bottom: 5px;
  display: block;
  color: #333;
}

input,
select {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

input:disabled {
  background-color: #f5f5f5;
}

.birthday-group,
.email-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.birthday-group input,
.email-group input {
  flex: 2;
  padding: 10px;
}

.email-group select {
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-button {
  width: 100%; 
  padding: 12px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #fdbb2d;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #fca311;
}

@media (max-width: 480px) {
  h1 {
    font-size: 1.5rem; 
  }

  .form-group {
    margin-bottom: 12px;
  }
}
</style>

