<template>
  <div class="layout">
    <p-header class="header" />
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
  .content {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
