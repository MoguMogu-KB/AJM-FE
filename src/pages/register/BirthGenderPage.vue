<template>
    <div class="container">
        <header class="header">
            <img src="/src/assets/helmet.png" alt="안전모 로고" class="logo" />
            <h2>생년월일을 입력해주세요</h2>
        </header>
        <main>
            <div class="form-group">
                <label for="birth">생년월일</label>
                <div class="birth-input">
                    <input type="number" placeholder="년" v-model="year" min="1900" max="2100" />
                    <input type="number" placeholder="월" v-model="month" min="1" max="12" />
                    <input type="number" placeholder="일" v-model="day" min="1" max="31" />
                </div>
            </div>
            <div class="form-group">
                <label>성별을 알려주세요</label>
                <div class="gender-select">
                    <button class="gender-btn" :class="{ active: gender === 'male' }" @click="selectGender('male')">
                        남성
                    </button>
                    <button class="gender-btn" :class="{ active: gender === 'female' }" @click="selectGender('female')">
                        여성
                    </button>
                </div>
            </div>
            <button class="submit-btn" @click="goToNext">가입하기</button>
        </main>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios';

const year = ref("");
const month = ref("");
const day = ref("");
const gender = ref("");
const age = ref(0);

const router = useRouter();

const selectGender = (selectedGender) => {
    gender.value = selectedGender;
};

const signupData = JSON.parse(localStorage.getItem("signupData"));
if (signupData) {
    console.log("첫 페이지 데이터:", signupData);
}

const goToNext = async () => {
    if (!year.value || !month.value || !day.value || !gender.value) {
        alert("모든 정보를 입력해주세요!");
        return;
    }
    age.value = 2024 - year.value;
    console.log("년생 :", age.value);

    const finalData = {
        ...signupData,
        gender: gender.value,
        age: age.value,
        year: year.value,
        month: month.value,
        day: day.value
    };
    console.log(finalData);

    try {
        // Axios를 이용해 백엔드로 데이터 전송
        const response = await axios.post("https://7f96-14-36-176-7.ngrok-free.app/user/register", finalData);
        if (response.status === 200) {
            alert("회원가입이 완료되었습니다!");
            localStorage.setItem("userId", finalData.userId);
            localStorage.setItem("ROLE", "user");
            localStorage.removeItem("signupData"); // LocalStorage 데이터 삭제
        }
    } catch (error) {
        console.error("회원가입 실패:", error);
        alert("회원가입 중 오류가 발생했습니다.");
    }
    
    // 데이터 저장 후 다음 페이지로 이동
    router.push("/account-select");
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
    color: black;
}

.form-group {
    margin-bottom: 24px;
    text-align: center;
}

.birth-input {
    display: flex;
    gap: 8px;
    justify-content: center;
}

.birth-input input {
    width: 50px;
    padding: 8px;
    font-size: 14px;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.gender-select {
    display: flex;
    gap: 16px;
    justify-content: center;
}

.gender-btn {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: white;
    font-size: 14px;
    cursor: pointer;
}

.gender-btn.active {
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