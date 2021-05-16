<template>
  <van-pull-refresh v-model="_refresh" @refresh="onRefresh">
    <van-list
      v-model="_loading"
      :finished="finished"
      :finished-text="finishedText"
      @load="onLoad"
    >
      <slot></slot>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import { use } from '@/assets/js/import-vant.js';
use(['List', 'PullRefresh']);
export default {
  name: 'pull-refresh-list',
  props: {
    refresh: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    finished: {
      type: Boolean,
      default: false,
    },
    finishedText: {
      default: '没有更多了',
    },
  },
  data() {
    return {};
  },
  methods: {
    onLoad() {
      this.$emit('load');
    },
    onRefresh() {
      this.$emit('refresh');
    },
  },
  computed: {
    _refresh: {
      get() {
        return this.refresh;
      },
      set(v) {
        this.$emit('update:refresh', v);
      },
    },
    _loading: {
      get() {
        return this.loading;
      },
      set(v) {
        this.$emit('update:loading', v);
      },
    },
  },
};
</script>

<style></style>
