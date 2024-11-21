<template>
  <div class="account-list-container">
    <header class="header">
      <img src="../../assets/ajmlogo.png" alt="안전모 로고" class="logo" />
    </header>

    <!-- 필터와 검색 -->
    <div class="filter-search">
      <div class="dropdown">
        <button class="filter-button" @click="toggleDropdown">필터</button>
        <ul v-if="showDropdown" class="dropdown-menu">
          <li v-for="(category, index) in categories" :key="index" @click="selectCategory(category)"
            class="dropdown-item">
            {{ category }}
          </li>
        </ul>
      </div>
      <input type="text" placeholder="검색" class="search-input" />
      <button class="search-button">검색</button>
    </div>

    <!-- 계좌 카드 리스트 -->
    <div class="account-scroll-container">
      <div class="account-card" v-for="(account, index) in filteredAccounts" :key="index">
        <img :src="account.logo" alt="통장 로고" class="account-logo" />
        <div class="account-info">
          <h3>{{ account.title }}</h3>
          <p>
            3인 기준 인당 <span class="amount">{{ account.price }}원</span>
          </p>
          <p>{{ account.duration }}</p>
        </div>
        <span class="badge">📅 {{ account.date }}</span>
      </div>
    </div>

    <!-- 구독 추천 영역 -->
    <h4>{{subscription}}에 관심이 많은 당신을 위한</h4>
    <h3>구독 서비스 추천</h3>
    <div class="recommendation-card">
      <!-- <p>{{ recommendation }}</p> -->
      <div v-for="(item, index) in recommendationList" :key="index" class="recommendation-card">
        <!-- <img :src="item.image" alt="Service Image" class="recommendation-image" /> -->
         <a :href="item.url">link</a>
        <h3>{{ item.name }}</h3>
      </div>
    </div>

    <!-- 방 만들기 버튼 -->
    <button class="create-room-button" @click="makeRoom">방 만들기</button>

    <!-- 모달 창 -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h3>현재 등록된 계좌가 없습니다! 모임 통장용 계좌를 등록 및 개설하시겠습니까?</h3>
        <div class="modal-actions">
          <button @click="confirmModal" class="modal-button confirm">확인</button>
          <button @click="closeModal" class="modal-button cancel">취소</button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Footer from "@/components/common/Footer.vue";
import { useRouter } from "vue-router";
import axios from 'axios';

import OpenAI from "openai";

const router = useRouter();
const showDropdown = ref(false);
const selectedCategory = ref("");
const showModal = ref(false); // 모달 상태
const recommendationList = ref([]);
const subscription = localStorage.getItem("subscriptionType");

const categories = ["티빙", "웨이브", "디즈니플러스", "왓챠", "말해보카", "밀리의서재"];
const accounts = ref([
  {
    logo: new URL("../../assets/tving.png", import.meta.url).href,
    title: "티빙수야~",
    price: "4200",
    duration: "6개월",
    date: "매달 15일",
  },
  {
    logo: new URL("../../assets/wavve.png", import.meta.url).href,
    title: "mp3보다 웨이브",
    price: "4000",
    duration: "1개월",
    date: "매달 20일",
  },
  {
    logo: new URL("../../assets/malhaevoca.png", import.meta.url).href,
    title: "말해보카 해보카?",
    price: "55000",
    duration: "12개월",
    date: "매달 10일",
  },
  {
    logo: new URL("../../assets/disneyplus.png", import.meta.url).href,
    title: "디즈니 플러스 플러스!",
    price: "55000",
    duration: "12개월",
    date: "매달 14일",
  },
]);

const openai = new OpenAI({
  organization: "org-GKPGgiClQ2thaj7NQWA26IUx",
  apiKey: `${import.meta.env.VITE_OPENAI_API_KEY}`,
  dangerouslyAllowBrowser: true
});

console.log("API Key:", import.meta.env.VITE_OPENAI_API_KEY);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const selectCategory = (category) => {
  selectedCategory.value = category;
  showDropdown.value = false;
};

const fetchRecommendation = async () => {
  const ottServices = localStorage.getItem("ottServices");
  const subscriptionType = localStorage.getItem("subscriptionType");
  const prompt =`${subscriptionType}에 관심이 있고 ${ottServices}를 사용해본 사용자가 좋아할 구독 서비스를 추천해주세요. 이름과 URL을 제공해주세요. 응답 형식은 부가설명없이 JSON으로만 6개의 데이터를,이름은 name, URL은 url 키 형태로 제공해주세요.`;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
      }
    );

    const recommendations = JSON.parse(response.data.choices[0].message.content);

    // 응답 데이터를 Vue 상태에 저장
    recommendationList.value = recommendations;
  } catch (error) {
    console.error("추천 데이터 가져오기 실패:", error.response.data);
  }
};

onMounted(() => {
  fetchRecommendation();
});

const filteredAccounts = computed(() => {
  if (!selectedCategory.value) return accounts.value;
  return accounts.value.filter((account) =>
    account.title.includes(selectedCategory.value)
  );
});

// 방 만들기 버튼 클릭 시 로직
const makeRoom = () => {
  const accountNumber = localStorage.getItem("accountNum");
  if (accountNumber == "no account") {
    // 계좌 번호가 없는 경우 모달을 표시
    showModal.value = true;
  } else {
    // 계좌 번호가 있는 경우 다음 단계로 이동
    router.push("/subscribe");
  }
};

// 모달 확인 버튼 클릭
const confirmModal = () => {
  // 계좌 등록 및 개설 처리 로직
  // console.log("계좌를 등록 및 개설합니다.");
  // localStorage.setItem("accountNumber", "1234567890"); // 임의의 계좌 번호 저장
  // showModal.value = false;
  router.push("/sharingaccount"); // 다음 단계로 이동
};

// 모달 취소 버튼 클릭
const closeModal = () => {
  alert("계좌를 등록 및 개설하지 않으면 방을 만들 수 없습니다!")
  showModal.value = false;
};
</script>

<style scoped>
.account-list-container {
  padding: 10px;
  background-color: #f9f9f9;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.logo {
  width: 100px;
}


.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  z-index: 1000;
  width: 150px;
  padding: 0;
  list-style: none;
  margin: 0;
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #333;
}

.dropdown-item:hover {
  background-color: #fdbb2d;
  color: white;
}

.filter-search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
}

.filter-button {
  background-color: #9a9a9a;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 0.8rem;
  border-radius: 5px;
  cursor: pointer;
  width: auto;
  text-align: center;
  white-space: nowrap;
}

.search-button {
  background-color: #ffd700;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 0.8rem;
  border-radius: 5px;
  cursor: pointer;
  width: auto;
  text-align: center;
  white-space: nowrap;
}

.search-input {
  flex: 1;
  padding: 6px;
  font-size: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}


.account-scroll-container {
  max-height: 250px;
  overflow-y: scroll;
  margin-bottom: 15px;
  padding-right: 5px;
}

.account-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 0.8rem;
}

.account-logo {
  width: 40px;
  height: 40px;
  border-radius: 5px;
}

.account-info {
  flex: 1;
  margin-left: 10px;
}

.account-info h3 {
  font-size: 0.9rem;
  margin: 0;
}

.account-info p {
  font-size: 0.75rem;
  color: #555;
}

.amount {
  color: #ff4500;
  font-weight: bold;
}

.badge {
  font-size: 0.7rem;
  background-color: #ffd700;
  color: white;
  padding: 3px 6px;
  border-radius: 8px;
}

.recommendation-card {
  background-color: #ffe599;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 0.9rem;
}

.create-room-button {
  display: block;
  width: 60px;
  height: 60px;
  padding: 0;
  background-color: #fdbb2d;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  position: fixed;
  bottom: 80px;
  right: 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.create-room-button:hover {
  background-color: #e8a326;
}

@media screen and (max-width: 768px) {

  .filter-button,
  .search-button {
    padding: 5px 8px;
    font-size: 0.7rem;
  }

  .search-input {
    font-size: 0.7rem;
  }

  .account-card {
    padding: 6px;
    font-size: 0.7rem;
  }

  .create-room-button {
    width: 90%;
    padding: 8px;
    font-size: 0.8rem;
  }

  .account-list-container {
    padding: 10px;
    background-color: #f9f9f9;
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .logo {
    width: 100px;
  }

  .filter-search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
  }

  .filter-button {
    background-color: #9a9a9a;
    color: white;
    border: none;
    padding: 5px 10px;
    font-size: 0.8rem;
    border-radius: 5px;
    cursor: pointer;
  }

  .search-button {
    background-color: #ffd700;
    color: white;
    border: none;
    padding: 5px 10px;
    font-size: 0.8rem;
    border-radius: 5px;
    cursor: pointer;
  }

  .search-input {
    flex: 1;
    padding: 6px;
    font-size: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .account-scroll-container {
    max-height: 250px;
    overflow-y: scroll;
    margin-bottom: 15px;
    padding-right: 5px;
  }

  .account-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    padding: 8px;
    margin-bottom: 8px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .account-logo {
    width: 40px;
    height: 40px;
  }

  .account-info {
    flex: 1;
    margin-left: 10px;
  }

  .account-info h3 {
    font-size: 0.9rem;
  }

  .account-info p {
    font-size: 0.75rem;
    color: #555;
  }

  .amount {
    color: #ff4500;
    font-weight: bold;
  }

  .badge {
    font-size: 0.7rem;
    background-color: #ffd700;
    color: white;
    padding: 3px 6px;
    border-radius: 8px;
  }

  .recommendation-card {
    background-color: #ffe599;
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    margin-bottom: 15px;
  }

  .create-room-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    background-color: #fdbb2d;
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 0.8rem;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .create-room-button:hover {
    background-color: #e8a326;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    width: 300px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .modal-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }

  .modal-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
  }

  .modal-button.confirm {
    background-color: #e8a326;
    color: white;
  }

  .modal-button.cancel {
    background-color: #f44336;
    color: white;
  }

  .modal-button:hover {
    opacity: 0.9;
  }

  @media screen and (max-width: 768px) {

    .filter-button,
    .search-button {
      padding: 5px 8px;
      font-size: 0.7rem;
    }

    .account-card {
      padding: 6px;
      font-size: 0.7rem;
    }

    .create-room-button {
      width: 50px;
      height: 50px;
      font-size: 0.7rem;
    }
  }

}
</style>
