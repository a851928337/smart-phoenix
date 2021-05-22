<template>
  <div class="date-picker">
    <div class="date-time">
      {{ val[0] }} {{ val[1] }}
      <i class="iconfont icon-you" />
    </div>
    <van-action-sheet
      class="date-time-action-sheet"
      v-model="_value"
      :round="false"
      @click-overlay="onHide"
      get-container="body"
    >
      <div class="content">
        <div class="title">
          <div class="left">
            <div
              @click="onTapClick('date')"
              :class="['date', { active: active === 'date' }]"
            >
              {{ formatDate(date) }}
            </div>
            <div
              @click="onTapClick('time')"
              :class="['time', { active: active === 'time' }]"
            >
              {{ time }}
            </div>
          </div>
          <div class="confirm" @click="confirm">确定</div>
        </div>
        <van-calendar
          v-if="active === 'date'"
          :show-title="false"
          :show-subtitle="false"
          :poppable="false"
          :show-confirm="false"
          :show-mark="false"
          :min-date="min"
          :max-date="max"
          ref="calendar"
          @select="onSelect"
          class="calendar"
          color="#696a6c"
        />
        <van-datetime-picker
          v-if="active === 'time'"
          v-model="time"
          type="time"
          :show-toolbar="false"
          class="time-picker"
        />
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { use } from '@/assets/js/import-vant';
use(['ActionSheet', 'Calendar', 'DatetimePicker']);
export default {
  name: 'date-picker',
  props: {
    value: {
      default: false,
    },
  },
  data() {
    return {
      date: new Date(),
      time: dayjs().format('HH:mm'),
      val: [],
      min: dayjs().subtract(1, 'year').toDate(),
      max: dayjs().add(1, 'year').toDate(),
      active: 'date',
    };
  },
  mounted() {
    this.confirm();
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
  methods: {
    formatDate(v) {
      return dayjs(v).format('YYYY-MM-DD');
    },
    formatTime(v) {
      return dayjs(v).format('HH:mm');
    },
    getContainer() {
      return this.$refs.action;
    },
    onSelect(v) {
      this.date = dayjs(v).format('YYYY-MM-DD');
    },
    onHide() {
      const init = new Date(this.val.join(' '));
      this.$refs.calendar?.reset(init);
      this.date = init;
      this.time = this.formatTime(init);
      this.active = 'date';
    },
    onTapClick(v) {
      this.active = v;
    },
    confirm() {
      this.val = [this.formatDate(this.date), this.time];
      this.$emit('change', this.val.join(' '));
      this._value = false;
    },
  },
};
</script>

<style lang="less" scoped>
.date-picker {
  flex: 1;
  .date-time {
    text-align: right;
    line-height: 1;
    font-size: .px2vw(30) [ @vw];
    color: #333;
    .icon-you {
      font-size: .px2vw(30) [ @vw];
    }
  }
}
</style>
<style lang="less">
.date-time-action-sheet {
  height: .px2vw(818) [ @vw];
  .van-action-sheet__content {
    .title {
      box-sizing: border-box;
      padding: 0 .px2vw(30) [ @vw];
      background-color: #f0f0f3;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: .px2vw(32) [ @vw];
      color: #999;
      .left {
        display: flex;
        align-items: center;
        & > div {
          padding: .px2vw(30) [ @vw] 0;
          margin-right: .px2vw(40) [ @vw];
          border-bottom: 2px solid transparent;
          &.active {
            color: #333;
            border-bottom-color: #333;
          }
        }
      }
      .confirm {
        color: #0f85fe;
      }
    }
    .content {
      height: 100%;
      display: flex;
      flex-flow: column;
      & > * {
        width: 100%;
      }

      .calendar {
        flex: 1;
        overflow: hidden;
        .van-calendar__header {
          box-shadow: none;
        }
      }
      .time-picker {
        flex: 1;
        display: flex;
        flex-flow: column;
        justify-content: center;
      }
    }
  }
}
</style>
