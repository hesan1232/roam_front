<template>
  <div class="login_container">
    <transition name="Skleft">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  data() {
    return {
      SkipSwitchName: "",
    };
  },
  watch: {
    $route(to, from) {
      if (this.SkipSwitchName == "Skleft") {
        this.SkipSwitchName = "Skright";
      } else {
        this.SkipSwitchName = "Skleft";
      }
     
    },
  }
};
</script>

<style scoped>
.login_container {
  width: 100vw !important;
  height: 100vh !important;
  background: url(@/assets/login/login_bg1.jpg);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
/* 路由跳转动画 */
.Skright-enter-active,
.Skright-leave-active,
.Skleft-enter-active,
.Sklef-leave-active {
  transition: all 1000ms ease-in-out;
}

.Skright-enter {
  transform: translate3d(-100%, 0, 0) ;
}
.Skright-leave-to {
  transform: translate3d(100%, 0, 0);
  opacity: 0;
}
.Skleft-enter {
  transform: translate3d(-100%, 0, 0);
}

.Skleft-leave-to {
  transform: translate3d(100%, 0, 0);
  opacity: 0;
}
</style>