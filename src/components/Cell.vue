<template>
  <div class="cell">
    <div
      :class="['content', type, { 'tap-transform': canClick, wrap: wrap }]"
      @click="onClick"
    >
      <div class="label">{{ label }}</div>
      <slot>
        <input
          v-if="type === 'input'"
          :placeholder="placeholder"
          v-model="_value"
        />
        <van-radio-group v-else-if="type === 'radio'"></van-radio-group>
        <van-switch
          class="switch"
          v-else-if="type === 'switch'"
          v-model="_value"
          inactive-color="#b3b3b3"
          active-color="#2A987A"
          @click.stop
        />
        <div class="checkbox-group" v-else-if="type === 'checkbox'">
          <van-checkbox-group
            direction="horizontal"
            @change="onChange"
            v-model="checkBoxValues"
            checked-color="#2A987A"
          >
            <van-checkbox
              v-for="(item, index) in checkboxList"
              :key="index"
              :name="index"
              shape="square"
            >
              {{ item.text }}
            </van-checkbox>
          </van-checkbox-group>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import { use } from '@/assets/js/import-vant';
use(['Radio', 'Switch', 'CheckboxGroup', 'Checkbox']);
export default {
  name: 'cell',
  props: {
    label: {
      required: true,
      type: String,
    },
    type: {
      default: 'input',
    },
    placeholder: {
      default: '',
    },
    value: {
      default: '',
    },
    wrap: {
      type: Boolean,
    },
    checkboxList: {
      default: () => [],
    },
  },
  data() {
    return {
      checkBoxValues: [],
      clickTypeList: ['click', 'switch'],
      canClick: false,
    };
  },
  mounted() {
    this.canClick = this._canClick;
  },
  methods: {
    onClick(e) {
      const handlerMap = {
        click: this.handleNormalClick,
        switch: this.handleSwitchClick,
      };
      handlerMap[this.type]?.(e);
    },
    onChange(v) {
      this.$emit('change', [...v]);
    },
    handleNormalClick(e) {
      this.$emit('click', e);
    },
    handleSwitchClick() {
      this._value = !this._value;
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
    _canClick() {
      return this.clickTypeList.includes(this.type);
    },
  },
};
</script>

<style lang="less" scoped>
.cell {
  background-color: #fff;
  &:first-child {
    border-top: 1px solid #e8e8e8;
  }
  &:not(:last-child) {
    border-bottom: .px2vw(16) [ @vw] solid #f0f0f0;
  }
  .content {
    display: flex;
    align-items: center;
    padding: .px2vw(39) [ @vw] .px2vw(50) [ @vw] .px2vw(30) [ @vw];

    &.switch,
    &.radio {
      justify-content: space-between;
    }
    &.wrap,
    &.checkbox {
      flex-wrap: wrap;
      .label {
        width: 100%;
        margin-bottom: .px2vw(17) [ @vw];
      }
    }
    .label {
      font-size: .px2vw(30) [ @vw];
      color: #333;
      min-width: .px2vw(200) [ @vw];
      padding-right: .px2vw(50) [ @vw];
      box-sizing: border-box;
      font-weight: 500;
    }
    input {
      flex: 1;
      border: none;
      outline: none;
      font-size: .px2vw(30) [ @vw];
      color: #666;
      line-height: 1;
      ::placeholder {
        color: #999;
      }
    }

    .switch {
      transform: rotate(180deg);
      transform-origin: 50% 50%;
    }

    /deep/ .switch {
      font-size: .px2vw(36) [ @vw];
      .van-switch__node {
        box-shadow: none;
      }
    }
    .checkbox-group {
      flex: 1;
    }
    /deep/ .checkbox-group {
      .van-checkbox-group {
        display: flex;
        flex-wrap: wrap;
        .van-checkbox {
          width: 33.3%;
          margin-right: 0;
          margin-top: .px2vw(20) [ @vw];
          &:nth-child(-n + 3) {
            margin-top: 0;
          }
          .van-checkbox__icon > .van-icon {
            border-color: @green;
            border-radius: 3px;
          }
        }
      }
    }
  }
}
</style>
