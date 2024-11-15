<template>
    <div>
      <h1>모임통장 상세 페이지</h1>
      <p>통장 ID: {{ id }}</p>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const id = route.params.id
  </script>
  