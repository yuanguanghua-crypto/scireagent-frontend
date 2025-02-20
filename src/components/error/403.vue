<template>
  <div class="error-page">
    <div class="error-code">4<span>0</span>3</div>
    <div class="error-desc">{{$t("page404.nmyqxfw")}}</div>
    <div class="error-handle">
      <router-link to="/">
        <el-button type="primary" size="large">{{$t("page404.fhsy")}}</el-button>
      </router-link>
      <el-button class="error-btn" type="primary" size="large" @click="goBack">{{$t("page404.fhsyy")}}</el-button>
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
