<template>
  <div class="visit-record-page">
    <record-condition v-model="condition" :no="$route.query.no" />
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
import { getVisitList } from '@/api/api';
export default {
  name: 'visit-record-page',
  components: { RecordCondition, PullRefreshList, RecordCard },
  data() {
    return {
      refresh: false,
      loading: false,
      finished: false,
      condition: {},
      list: [],
    };
  },
  methods: {
    getQuery() {
      return {
        problem_type: this.condition?.problem?.code || '',
        household_id: this.condition?.no?.code || '',
        select_date: this.condition?.date?.code || '',
        problem_process: this.condition?.process?.code || '',
      };
    },
    async loadData() {
      const res = await getVisitList(this.getQuery());
      const { list } = res.data.body;
      this.list = list;
    },
    onLoad() {
      this.loadData().then(() => {
        this.loading = false;
        this.finished = true;
      });
    },
    onRefresh(v) {
      this.list = [];
      this.loading = v;
      this.loadData().then(() => {
        this.refresh = false;
      });
    },
  },
  watch: {
    condition: {
      deep: true,
      handler: function () {
        this.onRefresh(true);
      },
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
  /deep/ .list .van-pull-refresh {
    height: 100%;
  }
}
</style>
