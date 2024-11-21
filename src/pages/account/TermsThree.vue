<template>
  <div class="pdf-container">
    <div class="nav-buttons">
      <button @click="prevPage" class="nav-button prev-button">&#8249;</button> 
      <canvas ref="pdfCanvas"></canvas>
      <button @click="nextPage" class="nav-button next-button">&#8250;</button> 
    </div>
    
    <div class="agree-button-container">
      <button @click="handleAgree" class="agree-button" :disabled="!isLastPage">전체 동의</button>
    </div>
  </div>
</template>

<script>
import pdfSrc from '@/assets/동의서모임통장총무용.pdf';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

// PDF.js 워커 파일 경로를 설정함
// CDN을 사용하여 pdf.worker.min.js를 가져옴
GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";

export default {
  data() {
    return {
      pdfSrc,             // PDF 파일 경로
      pdfDoc: null,       // PDF 문서 객체
      page: 1,            // 현재 페이지
      totalPages: 0,      // 총 페이지 수
      isLastPage: false,  // 마지막 페이지 여부
    };
  },
  mounted() {
    this.loadPdf();
  },
  methods: {
    async loadPdf() {
      const loadingTask = getDocument(this.pdfSrc);
      this.pdfDoc = await loadingTask.promise;
      this.totalPages = this.pdfDoc.numPages;
      this.renderPage(this.page);
    },
    async renderPage(pageNum) {
      const page = await this.pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = this.$refs.pdfCanvas;
      const context = canvas.getContext('2d');
      
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      await page.render(renderContext);

      // 마지막 페이지인지 확인하고 상태 업데이트
      this.isLastPage = this.page === this.totalPages;
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.renderPage(this.page);
      }
    },
    nextPage() {
      if (this.page < this.totalPages) {
        this.page++;
        this.renderPage(this.page);
      }
    },
    handleAgree() {
      if (this.isLastPage) {
        this.$router.push('/endterms'); 
      }
    }
  }
}
</script>

<style scoped>
.pdf-container {
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
}

.nav-buttons {
  display: flex;
  justify-content: center; 
  align-items: center; 
}

.nav-button {
  font-size: 24px;
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  transition: background-color 0.3s ease;
  margin: 0 px; 
}

.nav-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

canvas {
  width: 80%;
 /* 캔버스 최대 너비 설정 */
  border: 1px solid #ccc;
}

.agree-button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.agree-button {
  padding: 14px;
  font-size: 14px;
  background-color: #f4b400;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

/* 버튼 비활성화 상태 */
.agree-button:disabled {
  background-color: #ccc; 
  cursor: not-allowed; 
}
</style>
