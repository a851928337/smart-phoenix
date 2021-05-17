<template>
  <div class="visit-record-page">
    <record-condition />
    <div class="list">
      <pull-refresh-list
        :refresh.sync="refresh"
        :loading.sync="loading"
        :finished="finished"
        @load="onLoad"
        @refresh="onRefresh"
      >
        <record-card v-for="(item, index) in list" :key="index" :item="item" />
      </pull-refresh-list>
    </div>
  </div>
</template>

<script>
import RecordCondition from '@/components/RecordCondition';
import PullRefreshList from '@/components/PullRefreshList';
import RecordCard from '@/components/RecordCard';
export default {
  name: 'visit-record-page',
  components: { RecordCondition, PullRefreshList, RecordCard },
  data() {
    return {
      refresh: false,
      loading: false,
      finished: false,
      list: [],
    };
  },
  methods: {
    loadData() {
      return new Promise((resolve) => {
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push({
              id: i,
              name: '张君雅',
              problem: [0, 1],
              isOnSide: true,
              description:
                '问题描述：生态环境出现现场解决的，事情在2021年12月封路中午生态环境出现，现场解决的事情在，2021年12月封路中午，现场解决的事情在，2021年12月封路中午，现场解决的事情在，2021年12月封路中午',
              status: 0,
              date: '2021-05-10',
            });
            resolve();
          }
        }, 500);
      });
    },
    onLoad() {
      this.loadData().then(() => {
        this.loading = false;
        this.finished = true;
      });
    },
    onRefresh() {
      this.list = [];
      this.loadData().then(() => {
        this.refresh = false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.visit-record-page {
  height: 100%;
  display: flex;
  flex-flow: column;
  background-color: #f5f5f5;
  & > * {
    width: 100%;
  }
  .list {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
