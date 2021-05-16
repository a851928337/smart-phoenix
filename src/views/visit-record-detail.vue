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
          <div class="value">{{ detail[item.key] }}</div>
        </div>
      </div>
      <div class="card">
        <div class="row">
          <div class="title">走访信息</div>
        </div>
        <div class="row" v-for="(item, index) in card2List" :key="index">
          <div class="label">{{ item.label }}</div>
          <div class="value">{{ detail[item.key] }}</div>
        </div>
      </div>
    </div>
  </pull-refresh-list>
</template>

<script>
import PullRefreshList from '@/components/PullRefreshList';

export default {
  name: 'visit-record-detail-page',
  components: { PullRefreshList },
  data() {
    return {
      refresh: false,
      loading: false,
      finished: false,
      detail: {},
      card1List: [
        { label: '被访人', key: 'name' },
        { label: '手机号', key: 'phone' },
        { label: '是户主', key: 'isHead' },
        { label: '是空户', key: 'isEmpty' },
        { label: '户口在本辖区内', key: 'isInArea' },
        { label: '户口所在地', key: 'address' },
        { label: '重点访类型', key: 'keyType' },
      ],
      card2List: [
        { label: '走访时间', key: 'date' },
        { label: '是否反映问题', key: 'isProblem' },
        { label: '问题描述', key: 'description' },
        { label: '问题分类', key: 'problemType' },
        { label: '限时整改', key: 'limited' },
      ],
    };
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        this.detail = {
          name: '王璐',
          phone: '18840921707',
          isHead: '是',
          isEmpty: '否',
          isInArea: '是',
          address: '山东省临淄市先休息休息小区3栋',
          keyType: '老党员',
          date: '2021-05-05  12:56',
          isProblem: '是',
          description:
            '户门口长期堆放自行车，影响美观和出行度便利影响美观和出行度便利',
          problemType: '生态环境',
          limited: '限时整改',
        };
        this.refresh = false;
        this.loading = false;
        this.finished = true;
      }, 500);
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
        color: #333;
      }
    }
  }
}
</style>
