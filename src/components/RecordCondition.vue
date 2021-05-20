<template>
  <div ref="container" class="condition">
    <div class="container">
      <div
        class="item"
        v-for="(item, index) in conditionList"
        :key="index"
        :data-type="item.type"
        @click="onShow"
      >
        {{  item.label(condition[item.type].label) }}
        <i class="iconfont icon-xia" />
      </div>
    </div>
    <div
      :class="['mask', { active: show }]"
      :style="{ height: `${parentHeight}px` }"
      @click="onHide"
    ></div>
    <div
      :class="['select-menu', { active: show }]"
      :style="{ '--maxHeight': `${height}px` }"
    >
      <div class="date-content" v-if="type === 'date'">
        <div class="year-list">
          <div
            :class="['item', { active: yearIndex === index }]"
            v-for="(item, index) in getList"
            :key="index"
            @click="yearIndex = index"
          >
            {{ item.label }}
          </div>
        </div>
        <div class="month-list">
          <div
            :class="['item', { active: monthIndex === index }]"
            v-for="(item, index) in monthList"
            :key="index"
            @click="monthIndex = index"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
      <div class="search-content" v-else-if="type === 'no'">
        <van-search v-model="search" shape="round" placeholder="请输入户号" />
        <div class="list">
          <div
            :class="['item', { active: getIndex === index }]"
            v-for="(item, index) in getList"
            :key="index"
            :data-index="index"
            @click="setIndex"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
      <div class="content" v-else>
        <div
          :class="['item', { active: getIndex === index }]"
          v-for="(item, index) in getList"
          :key="index"
          :data-index="index"
          @click="setIndex"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { use } from '@/assets/js/import-vant';
use(['Search']);
export default {
  name: 'record-condition',
  data() {
    return {
      show: false,
      search: '',
      conditionList: [
        { label: '时间', type: 'date' },
        { label: '户', type: 'no' },
        { label: '问题分类', type: 'problem' },
        { label: '进展', type: 'process' },
      ],
      condition: {
        date: '',
        no: '',
        problem: '',
        process: '',
      },
      type: '',
      yearIndex: 0,
      monthIndex: -1,
      noIndex: -1,
      problemIndex: -1,
      processIndex: -1,
      unwatch: null,
      height: 0,
      parentHeight: 0,
    };
  },
  mounted() {
    this.initWatcher();
    this.initParentHeight();
  },
  destroyed() {
    this.unwatch();
  },
  methods: {
    initWatcher() {
      this.unwatch = this.$watch(
        function () {
          return `${this.monthIndex},${this.noIndex},${this.problemIndex},${this.processIndex}`;
        },
        function (nVal, oVal) {
          const indexArr = nVal.split(',');
          const oldIndexArr = oVal.split(',');

          const [monthIndex, noIndex, problemIndex, processIndex] = indexArr;
          const [oldMonthIndex, oldNoIndex, oldProblemIndex, oldProcessIndex] =
            oldIndexArr;

          monthIndex >= 0 &&
            monthIndex !== oldMonthIndex &&
            this.setDateCondition(monthIndex);

          noIndex >= 0 &&
            noIndex !== oldNoIndex &&
            (this.condition.no = this.noList[noIndex]);

          problemIndex >= 0 &&
            problemIndex !== oldProblemIndex &&
            (this.condition.problem = this.problemList[problemIndex]);

          processIndex >= 0 &&
            processIndex !== oldProblemIndex &&
            (this.condition.process = this.processList[processIndex]);

          this.onHide();
        }
      );
    },
    initParentHeight() {
      const el = this.$refs.container;
      const rect = el.getBoundingClientRect();
      const parentRect = el.parentElement.getBoundingClientRect();
      this.height = parentRect.height - rect.height;
      this.parentHeight = parentRect.height;
    },
    setDateCondition(index) {
      const yearObj = this.$store.dateList[this.yearIndex];
      const year = yearObj.value;
      const month = yearObj.month[index].value;
      const date = `${year}-${month}`;
      this.condition.date = {
        label: date,
        value: date,
      };
    },
    setIndex(e) {
      const { index } = e.target.dataset;
      this[`${this.type}Index`] = Number(index);
    },
    onShow(e) {
      const { type } = e.target.dataset;
      if (this.type === type && this.show) {
        this.show = false;
      } else {
        this.type = type;
        this.show = true;
      }
    },
    onHide() {
      this.show = false;
    },
  },
  computed: {
    monthList() {
      return this.getList[this.yearIndex].month;
    },
    getList() {
      const listMap = {
        date: this.$store.dateList,
        no: this.$store.noList,
        problem: this.$store.problemList,
        process: this.$store.processList,
      };
      return listMap[this.type];
    },
    getIndex() {
      const indexMap = {
        no: this.noIndex,
        problem: this.problemIndex,
        process: this.processIndex,
      };
      return indexMap[this.type];
    },
  },
};
</script>

<style lang="less" scoped>
.condition {
  position: relative;
  .container {
    position: relative;
    z-index: 2;
    display: flex;
    .item {
      * {
        pointer-events: none;
      }
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: .px2vw(76) [ @vw];
      background-color: @green;
      color: #fff;
      font-size: .px2vw(26) [ @vw];
      &:not(:last-child) {
        border-right: 1px solid #fff;
      }
      .icon-xia {
        margin-left: .px2vw(8) [ @vw];
        font-size: .px2vw(20) [ @vw];
      }
    }
  }
  @transition: all 0.2s linear;
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 1;
    visibility: hidden;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.7);
    transition: @transition;
    &.active {
      visibility: visible;
      opacity: 1;
    }
  }
  .select-menu {
    width: 100%;
    position: absolute;
    z-index: 2;
    left: 0;
    top: 100%;
    overflow: hidden;
    max-height: 0vh;
    background-color: #fff;
    transition: @transition;
    @offset: 4px;
    &.active {
      max-height: var(--maxHeight);
    }
    .date-content,
    .search-content,
    .content {
      .item {
        height: .px2vw(126) [ @vw];
        font-size: .px2vw(36) [ @vw];
        transition: color, background-color 0.2s linear;
        &.active {
          font-weight: bold;
          color: @green;
        }
      }
    }
    .date-content {
      display: flex;
      .year-list,
      .month-list {
        max-height: var(--maxHeight);
        overflow: auto;
        .item {
          display: flex;
          align-items: center;
        }
      }
      .year-list {
        width: .px2vw(188) [ @vw];
        .item {
          justify-content: center;
          background-color: #d8d8d8;
          &.active {
            background-color: #fff;
          }
          &:not(:last-child) {
            border-bottom: 1px solid #fff;
          }
        }
      }
      .month-list {
        flex: 1;
        .item {
          padding-left: .px2vw(117) [ @vw];
          &:not(:last-child) {
            border-bottom: 1px solid #e8e8e8;
          }
        }
      }
    }
    .search-content {
      display: flex;
      flex-flow: column;
      & > * {
        width: 100%;
      }
      .list {
        flex: 1;
        overflow: auto;
      }
    }
    .search-content,
    .content {
      max-height: var(--maxHeight);
      overflow: auto;
      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        &.active {
          color: @green;
        }
        &:not(:last-child) {
          border-bottom: 1px solid #e8e8e8;
        }
      }
    }
  }
}
</style>
