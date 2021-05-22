<template>
  <header class="header">
    <div class="container">
      <div class="left">
        <slot name="left">
          <div v-if="preRoute" class="iconfont icon-zhuo" @click="onBack">
            {{ preRoute.title }}
          </div>
          <router-link
            tag="i"
            v-else
            class="iconfont icon-home"
            replace
            to="/"
          />
        </slot>
      </div>
      <div class="title">{{ title }}</div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'p-header',
  data() {
    return {
      title: this.$route.meta.title,
    };
  },
  mounted() {
    this.$store.$off('changetitle');
    this.$store.$on('changetitle', (title) => {
      this.title = title;
    });
  },
  destroyed() {
    this.$store.$off('changetitle');
  },
  methods: {
    onBack() {
      this.$router.back();
    },
  },
  computed: {
    preRoute() {
      const length = this.$store.routeList.length;
      return this.$store.routeList[length - 2];
    },
  },
  watch: {
    '$route.meta.title': function (nVal) {
      if (nVal) {
        this.title = nVal;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  background-color: #ededed;
  .container {
    display: flex;
    height: 44px;
    margin: 0 calc(.px2vw(32) [ @vw] - 10px);
    align-items: center;
    position: relative;
    .left,
    .title,
    .right {
      position: absolute;
    }
    .left,
    .right {
      padding: 10px;
    }
    .left {
      left: 0;
      .icon-zhuo,
      .icon-home {
        font-size: 14px;
        color: #333;
      }
    }
    .title {
      left: 50%;
      transform: translateX(-50%);
      font-size: 15px;
      color: #333;
      font-weight: bold;
    }
    .right {
      right: 0;
    }
  }
}
</style>
