<template>
  <div class="condition">
    <div class="container">
      <div
        class="item"
        v-for="(item, index) in conditionList"
        :key="index"
        :data-type="item.type"
        @click="onClickTab"
      >
        {{ condition[item.type].label || item.label }}
        <i class="iconfont icon-xia" />
      </div>
    </div>
    <div class="mask" v-show="type" @click="type = ''"></div>
    <div :class="['select-menu', { active: type }]">
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
export default {
  name: 'record-condition',
  data() {
    return {
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
    };
  },
  mounted() {
    this.initWatcher();
  },
  destroyed() {
    this.unwatch();
  },
  methods: {
    onClickTab(e) {
      const { type } = e.target.dataset;
      this.type = type;
    },
    setIndex(e) {
      const { index } = e.target.dataset;
      this[`${this.type}Index`] = Number(index);
    },
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

          this.type = '';
        }
      );
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
        font-size: 1vw;
      }
    }
  }

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;
  }
  .select-menu {
    @maxHeight: 60vh;
    width: 100%;
    position: absolute;
    z-index: 2;
    left: 0;
    top: 100%;
    overflow: hidden;
    max-height: @maxHeight;
    background-color: #fff;
    transition: all 0.2s linear;
    @offset: 4px;
    &.active {
      box-shadow: 0 @offset @offset -4px rgba(0, 0, 0, 0.3);
      max-height: @maxHeight;
    }
    .date-content,
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
        max-height: @maxHeight;
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
    .content {
      max-height: @maxHeight;
      overflow: auto;
      .item {
        display: flex;
        align-items: center;
        padding-left: .px2vw(117) [ @vw];
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
