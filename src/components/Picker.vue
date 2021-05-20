<template>
  <div class="picker">
    <div class="text">
      {{ columns[index].text }}
      <i class="iconfont icon-you" />
    </div>
    <van-action-sheet :round="false" v-model="_value" get-container="body">
      <van-picker
        :columns="columns"
        show-toolbar
        value-key="text"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-action-sheet>
  </div>
</template>

<script>
import { use } from '@/assets/js/import-vant';
use(['ActionSheet', 'Picker']);
export default {
  name: 'picker',
  props: {
    columns: {
      default: () => [],
    },
    value: {
      default: false,
    },
  },
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    onConfirm(item, index) {
      this.index = index;
      this.$emit('change', index);
      this.hide();
    },
    onCancel() {
      this.hide();
    },
    hide() {
      this._value = false;
    },
  },
  computed: {
    _value: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit('input', v);
      },
    },
  },
};
</script>

<style lang="less" scoped>
.picker {
  flex: 1;
  .text {
    width: 100%;
    text-align: right;
    font-size: .px2vw(30) [ @vw];
    color: @green;
    .icon-you {
      font-size: .px2vw(30) [ @vw];
    }
  }
}
</style>
