<template>
  <pull-refresh-list
    class="visit-record-detail-page"
    finished-text=""
    :refresh.sync="refresh"
    :loading.sync="loading"
    :finished="finished"
    @load="onLoad"
    @refresh="onLoad"
  >
    <div v-if="!loading">
      <div class="card">
        <div class="row">
          <div class="title">户情况</div>
        </div>
        <div class="row" v-for="(item, index) in card1List" :key="index">
          <div class="label">{{ item.label }}</div>
          <div class="value">
            {{ filter(item) }}
          </div>
        </div>
      </div>
      <div class="card">
        <div class="row">
          <div class="title">走访信息</div>
        </div>
        <div class="row" v-for="(item, index) in card2List" :key="index">
          <div class="label">{{ item.label }}</div>
          <div class="value" :style="{ color: item.color || '#333' }">
            {{ filter(item) }}
          </div>
        </div>
      </div>
    </div>
  </pull-refresh-list>
</template>

<script>
import { mixin } from '@/assets/mixin';
import PullRefreshList from '@/components/PullRefreshList';
import { getRecordDetail } from '@/api/api';
export default {
  name: 'visit-record-detail-page',
  components: { PullRefreshList },
  mixins: [mixin],
  data() {
    return {
      refresh: false,
      loading: false,
      finished: false,
      detail: {},
      card1List: [
        { label: '被访人', key: 'interviewee_name' },
        { label: '手机号', key: 'interviewee_mobile' },
        { label: '是户主', key: 'is_householder' },
        { label: '是空户', key: 'is_empty' },
        { label: '户口在本辖区内', key: 'is_local' },
        { label: '户口所在地', key: 'household_address' },
        { label: '重点访类型', key: 'visit_class' },
      ],
      card2List: [
        { label: '走访时间', key: 'visit_time', filter: this.date },
        { label: '是否反映问题', key: 'is_problem' },
        { label: '问题描述', key: 'problem_desc' },
        { label: '问题分类', key: 'problem_type' },
        { label: '整改方式', key: 'solve_method' },
        { label: '整改时限截止到', key: 'limited' },
        {
          label: '问题进度',
          key: 'problem_process',
          filter: this.process,
          color: '#0B6BDC',
        },
      ],
    };
  },
  methods: {
    filter(item) {
      const value = this.detail[item.key];
      let res = '无';
      if (value?.toString()) {
        res = item.filter ? item.filter(value) : value;
      }
      return res;
    },
    async onLoad() {
      const { id } = this.$route.params;
      const res = await getRecordDetail(id);
      const { body } = res.data;
      this.detail = body;
      this.refresh = false;
      this.loading = false;
      this.finished = true;
    },
  },
};
</script>

<style lang="less" scoped>
.visit-record-detail-page {
  background-color: #f5f5f5;
  height: 100%;
  overflow-y: auto;
  .card {
    padding-left: .px2vw(56) [ @vw];
    background-color: #fff;
    &:not(:last-child) {
      margin-bottom: .px2vw(16) [ @vw];
    }
    .row {
      padding: .px2vw(34) [ @vw] .px2vw(10) [ @vw];
      display: flex;
      &:not(:last-child) {
        border-bottom: 1px solid #e8e8e8;
      }
      .title {
        line-height: 1;
        border-left: .px2vw(8) [ @vw] solid @green;
        padding-left: .px2vw(21) [ @vw];
        font-size: .px2vw(34) [ @vw];
        font-weight: bold;
      }
      .label,
      .value {
        font-size: .px2vw(30) [ @vw];
      }
      .label {
        color: #999;
        margin-right: .px2vw(75) [ @vw];
      }
      .value {
        flex: 1;
      }
    }
  }
}
</style>
