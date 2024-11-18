<template>
    <div class="container">
      <header class="header">
        <img src="/src/assets/helmet.png" alt="안전모 로고" class="logo" />
        <h2>등록할 KB 계좌를 선택해주세요</h2>
      </header>
      <main>
        <ul class="account-list">
          <li
            v-for="account in accounts"
            :key="account.id"
            :class="{ selected: selectedAccount === account.id }"
            @click="selectAccount(account.id)"
          >
            <p>{{ account.name }}</p>
            <p>{{ account.number }}</p>
          </li>
        </ul>
        <button class="submit-btn" @click="finishSelection">선택 완료</button>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  const accounts = ref([
    { id: 1, name: "KB나라사랑우대통장", number: "930002-00-1254686" },
    { id: 2, name: "주택청약종합저축", number: "930002-00-1243547" },
    { id: 3, name: "KB청년희망적금", number: "930002-00-1234567" },
  ]);
  
  const selectedAccount = ref(null);
  
  const router = useRouter();
  
  const selectAccount = (id) => {
    selectedAccount.value = id;
  };
  
  const finishSelection = () => {
    if (!selectedAccount.value) {
      alert("계좌를 선택해주세요!");
      return;
    }
  
    // 선택된 계좌 처리 로직 추가 (예: API 전송)
    console.log("선택된 계좌 ID:", selectedAccount.value);
  
    // 회원가입 프로세스 완료
    // router.push("/welcome");
    router.push("/home");
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
  }
  
  .header {
    text-align: center;
    margin-bottom: 24px;
  }
  
  .logo {
    width: 50px;
    margin-bottom: 16px;
  }
  
  h2 {
    font-size: 18px;
    color: #333;
  }
  
  .account-list {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    max-width: 400px;
  }
  
  .account-list li {
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 16px;
    background-color: white;
    cursor: pointer;
    text-align: center;
  }
  
  .account-list li.selected {
    border-color: #f4b400;
    background-color: #f4b400;
    color: white;
  }
  
  .submit-btn {
    margin-top: 24px;
    padding: 12px 16px;
    font-size: 16px;
    color: white;
    background-color: #f4b400;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .submit-btn:hover {
    background-color: #e5a300;
  }
  </style>
  