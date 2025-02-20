<template>
  <div class="error-page">
      <div class="error-code">4<span>0</span>4</div>
      <div class="error-desc">你访问的页面不存在</div>
      <div class="error-handle">
        <router-link to="/">
            <button type="primary" size="large">404</button>
        </router-link>
        <button class="error-btn" type="primary" size="large" @click="goBack">返回首页</button>
      </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack(){
      this.$router.go(-1);
    }
  }
}
</script>


<style scoped>
@import url('./error.css');
</style>
