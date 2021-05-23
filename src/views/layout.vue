<template>
  <div class="layout">
    <p-header class="header">
      <template #right>
        <div @click="onRightClick">
          <div
            v-if="$route.name === 'person-detail'"
            class="iconfont icon-bianji_huaban"
          ></div>
          <div
            v-if="$route.name === 'person-edit'"
            class="save"
          >保存</div>
        </div>
      </template>
    </p-header>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import PHeader from '@/components/Header';
export default {
  name: 'layout',
  components: { PHeader },
  methods: {
    onRightClick() {
      this.$store.$emit('title-right-click');
    },
  },
};
</script>

<style lang="less" scoped>
.layout {
  height: 100vh;
  display: flex;
  flex-flow: column;
  & > * {
    width: 100%;
  }
  .header {
    .icon-bianji_huaban {
      font-size: .px2vw(40) [ @vw];
    }
  }
  .content {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
