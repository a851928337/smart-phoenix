<template>
  <div :class="['cell', divierType, float]">
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
        <div class="radio-group" v-else-if="type === 'radio'">
          <van-radio-group
            direction="horizontal"
            checked-color="#2A987A"
            v-model="_value"
          >
            <van-radio
              :icon-size="px2vw(30)"
              v-for="(item, index) in list"
              :key="index"
              :name="item.code"
              >{{ item.name }}</van-radio
            >
          </van-radio-group>
        </div>
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
              v-for="(item, index) in list"
              :key="index"
              :name="index"
              shape="square"
            >
              {{ item.name }}
            </van-checkbox>
          </van-checkbox-group>
        </div>
        <date-picker
          v-model="showPicker"
          v-else-if="type === 'date'"
          @change="onChange"
        ></date-picker>
        <textarea
          v-else-if="type === 'textarea'"
          :placeholder="placeholder"
          v-model="_value"
          rows="5"
        />
        <picker
          v-else-if="type === 'picker'"
          v-model="showPicker"
          :columns="list"
          @change="onChange"
        />
      </slot>
    </div>
  </div>
</template>

<script>
import DatePicker from '@/components/DatePicker';
import Picker from '@/components/Picker';
import { use } from '@/assets/js/import-vant';
use(['RadioGroup', 'Radio', 'Switch', 'CheckboxGroup', 'Checkbox']);
import { mixin } from '@/assets/mixin';

export default {
  name: 'cell',
  components: { DatePicker, Picker },
  mixins: [mixin],
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
    list: {
      default: () => [],
    },
    init: {
      default: '',
    },
    divierType: {
      default: 'block',
    },
    float: {
      default: 'left',
    },
  },
  data() {
    return {
      checkBoxValues: [],
      clickTypeList: ['click', 'switch', 'date', 'picker'],
      canClick: false,
      showPicker: false,
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
        date: this.handleShowPicker,
        picker: this.handleShowPicker,
      };
      handlerMap[this.type]?.(e);
    },
    onChange(v) {
      this.$emit('change', v);
    },
    handleNormalClick(e) {
      this.$emit('click', e);
    },
    handleSwitchClick() {
      this._value = !this._value;
    },
    handleShowPicker() {
      this.showPicker = !this.showPicker;
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
  &.block {
    &:not(:last-child) {
      border-bottom: .px2vw(16) [ @vw] solid #f0f0f0;
    }
    .content {
      padding: .px2vw(39) [ @vw] .px2vw(50) [ @vw] .px2vw(30) [ @vw];
    }
  }
  &.line {
    padding: 0 .px2vw(50) [ @vw];
    &:not(:last-child) {
      .content {
        border-bottom: 1px solid #f0f0f0;
      }
    }
    .content {
      padding: .px2vw(39) [ @vw] 0 .px2vw(30) [ @vw];
    }
  }
  &.full-line {
    padding: 0 .px2vw(50) [ @vw];
    &:not(:last-child) {
      border-bottom: 1px solid #f0f0f0;
    }
    .content {
      padding: .px2vw(39) [ @vw] 0 .px2vw(30) [ @vw];
    }
  }
  &.right{
    .content{
      justify-content: space-between;
      *:not(.label):not(textarea):not(.checkbox-group){
        text-align: right;
      }
    }
  }
}
.cell {
  background-color: #fff;
  &:first-child {
    border-top: 1px solid #e8e8e8;
  }

  .content {
    display: flex;
    align-items: center;

    &.switch,
    &.radio {
      justify-content: space-between;
    }

    // 换行显示的
    &.wrap,
    &.checkbox,
    &.textarea {
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
        font-size: .px2vw(30) [ @vw];
        .van-checkbox {
          min-width: 33.3%;
          padding-right: 20px;
          box-sizing: border-box;
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

    textarea {
      flex: 1;
      border: 1px solid #d2d2d2;
      border-radius: 2px;
      padding: .px2vw(22) [ @vw] .px2vw(31) [ @vw];
      background-color: #f9f9f9;
      color: #333;
      font-size: .px2vw(30) [ @vw];
      resize: none;
      ::placeholder {
        color: #999;
      }
    }

    .radio-group {
      flex: 1;
    }

    /deep/ .radio-group {
      .van-radio-group {
        display: flex;
        justify-content: flex-end;
        .van-radio:last-child {
          margin-right: 0;
        }
        .van-radio__label {
          font-size: .px2vw(30) [ @vw];
        }
      }
    }
  }
}
</style>
