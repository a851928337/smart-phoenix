<template>
  <div class="submit-card">
    <div v-if="title" class="card-title">
      <div class="title">{{ title }}</div>
      <slot name="title-right"></slot>
    </div>
    <slot name="content"></slot>
    <!-- <div class="content address">淄博市临淄区凤凰镇什么村几组几号</div> -->
  </div>
</template>

<script>
export default {
  name: 'submit-card',
  props: {
    title: {
      default: '',
    },
  },
};
</script>

<style lang="less" scoped>
.submit-card {
  overflow: hidden;
  padding: 0;
  background-color: #fff;
  &:not(:last-child) {
    margin-bottom: .px2vw(29) [ @vw];
  }
  .card-title {
    margin: .px2vw(48) [ @vw] .px2vw(50) [ @vw] .px2vw(25) [ @vw];
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: .px2vw(34) [ @vw];
      font-weight: bold;
      padding-left: .px2vw(21) [ @vw];
      border-left: .px2vw(8) [ @vw] solid @green;
      line-height: 1;
    }
  }
}
</style>
