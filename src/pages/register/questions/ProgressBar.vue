<template>
    <div class="progress-bar">
      <div class="progress" :style="{ width: `${progress}%` }"></div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      progress: {
        type: Number,
        required: true,
      },
    },
  };
  </script>
  
  <style>
  .progress-bar {
    height: 5px;
    background-color: #e0e0e0;
  }
  .progress {
    height: 5px;
    background-color: #f5a623;
    transition: width 0.3s;
  }
  </style>
  