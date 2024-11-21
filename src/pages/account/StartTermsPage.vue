<template>
  <div class="join-container">
    <h2>KB모임통장 서비스 가입을 시작합니다</h2>

    <div class="agreement-section">
      <table>
        <tbody>
          <tr>
            <td>
              <input type="checkbox" id="allAgree" v-model="allAgree" @change="goToTerms" />
            </td>
            <td>
              <label for="allAgree">약관 전체동의</label>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" id="termsAgree" v-model="termsAgree" :disabled="allAgree" />
            </td>
            <td>
              <label for="termsAgree">KB모임통장 서비스 이용약관[필수]</label>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" id="infoAgree" v-model="infoAgree" :disabled="allAgree" />
            </td>
            <td>
              <label for="infoAgree">
                개인(신용)정보 및 금융거래정보 제3자 제공 동의서<br />
                (KB모임통장 서비스-총무용)[필수]
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" id="serviceAgree" v-model="serviceAgree" :disabled="allAgree" />
            </td>
            <td>
              <label for="serviceAgree">KB모임통장 서비스 설명서[필수]</label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="next-button-container">
      <button @click="handleNext" :disabled="!canProceed">다음</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allAgree: false,  
      termsAgree: false,  
      infoAgree: false,  
      serviceAgree: false,  
    };
  },
  computed: {
    // 전체 동의 시 모든 체크박스를 활성화
    canProceed() {
      return (
        this.allAgree || 
        (this.termsAgree && this.infoAgree && this.serviceAgree)
      );
    }
  },
  methods: {
    // 전체 동의 체크박스 클릭 시 약관 페이지로 이동
    goToTerms() {
      if (this.allAgree) {
        this.$router.push('/termsone');  // 약관 전체 동의 시 'termsone' 페이지로 이동
      }
    },
    handleNext() {
      if (this.canProceed) {
        this.$router.push('/next-page');  // '다음' 버튼 클릭 시 이동할 페이지
      } else {
        alert("모든 필수 항목에 동의해주세요.");
      }
    }
  }
};
</script>

<style scoped>
.join-container {
  width: 90%;
  margin: 0 auto;
  text-align: center;
  max-width: 1200px;  /* 최대 너비 설정 */
}

h2 {
  font-size: 1.75rem;
  margin-bottom: 30px;
  font-weight: 600;
  color: #333;
}

.agreement-section table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  margin-bottom: 30px;
}

.agreement-section th, .agreement-section td {
  padding: 12px;
  border: 1px solid #ddd;
  font-size: 1rem;
  color: #555;
}

.agreement-section th {
  background-color: #f8f8f8;
  font-weight: 600;
}

.agreement-section td {
  vertical-align: middle;
}

.agreement-item input[type="checkbox"] {
  margin-right: 10px;
  transform: scale(1.2); /* 체크박스 크기 조정 */
}

.next-button-container button {
  padding: 15px 30px;
  font-size: 1.2rem;
  background-color: #f4b400;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  max-width: 300px;  /* 버튼의 최대 너비 설정 */
  margin: 20px auto;
  transition: background-color 0.3s ease;
}

.next-button-container button:hover {
  background-color: #e0a100;  /* 호버 시 색상 변경 */
}

.next-button-container button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* 모바일 화면에 맞게 스타일 변경 */
@media (max-width: 768px) {
  .join-container {
    width: 95%;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  .agreement-section table {
    margin-bottom: 20px;
  }

  .agreement-section th, .agreement-section td {
    font-size: 0.9rem;
    padding: 10px;
  }

  .next-button-container button {
    padding: 12px 20px;
  }
}
</style>
