<template>
  <div class="join-container">
    <h2>KB모임통장 서비스 가입을 시작합니다</h2>

    <div class="agreement-section">
      <table>
        <tbody>
          <tr>
            <td>
              <input type="checkbox" id="allAgree" v-model="allAgree" @change="goToTerms" checked />
            </td>
            <td>
              <label for="allAgree">약관 전체동의</label>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" id="termsAgree" v-model="termsAgree" :disabled="allAgree" checked />
            </td>
            <td>
              <label for="termsAgree">KB모임통장 서비스 이용약관[필수]</label>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" id="infoAgree" v-model="infoAgree" :disabled="allAgree" checked />
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
              <input type="checkbox" id="serviceAgree" v-model="serviceAgree" :disabled="allAgree" checked />
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
      allAgree: true,  
      termsAgree: true,  
      infoAgree: true,  
      serviceAgree: true,  
    };
  },
  computed: {
    canProceed() {
      return (
        this.allAgree || 
        (this.termsAgree && this.infoAgree && this.serviceAgree)
      );
    }
  },
  methods: {
    handleNext() {
      if (this.canProceed) {
        this.$router.push('/accountpassword');
      } else {
        alert("모든 필수 항목에 동의해주세요.");
      }
    }
  }
};
</script>

<style scoped>
.join-container {
  width: 80%;
  margin: 0 auto;
  text-align: center;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.agreement-section table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  margin-bottom: 20px;
}

.agreement-section th, .agreement-section td {
  padding: 5px;
  border: 1px solid #ddd;
  white-space: nowrap;
}

.agreement-section th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.agreement-item input[type="checkbox"] {
  margin-right: 10px;
}

.next-button-container button {
  padding: 12px 25px;
  font-size: 1.1rem;
  background-color: #f4b400;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
}

.next-button-container button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
