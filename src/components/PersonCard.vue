<template>
  <div class="person-card" @click="goTo">
    <div class="row1">
      <div class="name">{{ item.resident_name }}</div>
      <i v-if="item.is_cpc === '是'" class="iconfont icon-xingxing" />
    </div>
    <div class="row2">
      <div class="row">
        <div class="left">
          <img src="~@/assets/image/shipment.png" />
          {{ shipment(item.relation) }}
        </div>
        <div class="right">
          <img src="~@/assets/image/gender.png" />
          {{ gender(item.resident_sex) }}
        </div>
      </div>
      <div class="row">
        <div class="left">
          <img src="~@/assets/image/education.png" />
          {{ education(item.education) }}
        </div>
        <div class="right">
          <img src="~@/assets/image/work.png" />
          {{ item.work_unit }}
        </div>
      </div>
      <div class="row">
        <span>{{ identity(item.people_class) }}</span>
        <!-- <span v-for="(item, index) in item.identity" :key="index">
          {{ identity(item) }}</span
        > -->
      </div>
    </div>
  </div>
</template>

<script>
import { mixin } from '@/assets/mixin';
export default {
  name: 'person-card',
  mixins: [mixin],
  props: {
    item: {
      default: () => {},
    },
  },
  methods: {
    goTo() {
      this.$store.personInfo = this.item;
      this.$router.push({
        name: 'person-detail',
      });
    },
  },
};
</script>

<style lang="less" scoped>
.person-card {
  padding-left: .px2vw(40) [ @vw];
  border: 1px solid @green;
  border-radius: 0 0 10px 10px;
  background-color: #ebfef6;
  &:not(:last-child) {
    margin-bottom: .px2vw(21) [ @vw];
  }
  .row1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .px2vw(35) [ @vw] .px2vw(27) [ @vw] .px2vw(12) [ @vw] .px2vw(16) [
      @vw];
    border-bottom: 1px solid #b9e5d2;
    .name {
      font-size: .px2vw(32) [ @vw];
      color: #333;
      font-weight: bold;
    }
    i {
      color: #ff7474;
    }
  }
  .row2 {
    padding: .px2vw(41) [ @vw] .px2vw(27) [ @vw] .px2vw(31) [ @vw] .px2vw(16) [
      @vw];
    .row {
      display: flex;
      &:not(:last-child) {
        margin-bottom: .px2vw(26) [ @vw];
      }
      img {
        width: .px2vw(31) [ @vw];
        margin-right: .px2vw(20) [ @vw];
      }
      .left,
      .right {
        display: flex;
        align-items: flex-start;
        font-size: .px2vw(32) [ @vw];
        color: #333;
        line-height: 1;
      }
      .left {
        width: .px2vw(275) [ @vw];
      }
      .right {
        flex: 1;
      }
      span {
        line-height: 1;
        font-size: .px2vw(28) [ @vw];
        color: @green;
        margin-right: .px2vw(20) [ @vw];
      }
    }
  }
}
</style>
