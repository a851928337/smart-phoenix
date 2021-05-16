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
        <router-link
          tag="div"
          v-for="(item, index) in list"
          :key="index"
          :to="{ path: `/record/${item.id}` }"
          class="item"
        >
          <div class="row1">
            <div class="name">{{ item.name }}</div>
            <div class="problem-list">
              <div
                class="problem"
                v-for="(_item, _index) in item.problem"
                :key="_index"
              >
                {{ _item | problem }}
              </div>
            </div>
          </div>
          <div class="row2">
            {{ item.description }}
          </div>
          <div class="row3">
            <div class="status" :style="{ color: getStatusColor(item.status) }">
              {{ item.status | process }}
            </div>
            <div class="date">
              {{ item.date }}
            </div>
          </div>
        </router-link>
      </pull-refresh-list>
    </div>
  </div>
</template>

<script>
import RecordCondition from '@/components/RecordCondition';
import PullRefreshList from '@/components/PullRefreshList';
import { mixin } from '@/assets/mixin';
export default {
  name: 'visit-record-page',
  components: { RecordCondition, PullRefreshList },
  mixins: [mixin],
  data() {
    return {
      refresh: false,
      loading: false,
      finished: false,
      list: [],
      colorMap: ['#D0021B', '#0B6BDC', '#666666'],
    };
  },
  mounted() {
    console.log(mixin);
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
    getStatusColor(v) {
      return this.colorMap[v];
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
    .item {
      background-color: #fff;
      padding: .px2vw(36) [ @vw] .px2vw(42) [ @vw];
      &:not(:last-child) {
        margin-bottom: .px2vw(18) [ @vw];
      }
      .row1,
      .row2 {
        margin-bottom: .px2vw(18) [ @vw];
      }
      .row1,
      .row3 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .problem-list {
          display: flex;
        }
      }
      .row1 {
        .name {
          font-size: .px2vw(34) [ @vw];
          color: #333;
          font-weight: bold;
        }
        .problem-list {
          .problem {
            font-size: .px2vw(20) [ @vw];
            color: @green;
            border: 1px solid @green;
            padding: .px2vw(3) [ @vw] .px2vw(12) [ @vw];
            border-radius: 4px;
            &:not(:last-child) {
              margin-right: .px2vw(30) [ @vw];
            }
          }
        }
      }
      .row2 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #999;
        font-size: .px2vw(26) [ @vw];
      }
      .row3 {
        font-size: .px2vw(20) [ @vw];
        .date {
          color: #999;
        }
      }
    }
  }
}
</style>
