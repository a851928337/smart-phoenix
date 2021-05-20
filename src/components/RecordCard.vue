<template>
  <router-link
    tag="div"
    :to="{ path: `/record/${item.id}` }"
    class="record-card tap-transform"
  >
    <div class="row1">
      <div class="name">{{ item.name }}</div>
      <div class="problem-list">
        <div
          class="problem"
          v-for="(_item, _index) in item.problem"
          :key="_index"
        >
          {{ problem(_item) }}
        </div>
        <div class="is-on-side">
          {{ item.isOnSide | isOnSide }}
        </div>
      </div>
    </div>
    <div class="row2">
      {{ item.description }}
    </div>
    <div class="row3">
      <div class="status" :style="{ color: getStatusColor(item.status) }">
        {{ process(item.status) }}
      </div>
      <div class="date">
        {{ item.date }}
      </div>
    </div>
  </router-link>
</template>

<script>
import { mixin } from '@/assets/mixin';
export default {
  name: 'record-card',
  mixins: [mixin],
  filters: {
    isOnSide(v) {
      return v ? '现场解决' : '非现场解决';
    },
  },
  props: {
    item: {
      default: {
        item: [],
      },
    },
  },
  data() {
    return {
      colorMap: ['#D0021B', '#0B6BDC', '#666666'],
    };
  },
  methods: {
    getStatusColor(v) {
      return this.colorMap[v];
    },
  },
};
</script>

<style lang="less" scoped>
.record-card {
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
      .problem,
      .is-on-side {
        font-size: .px2vw(20) [ @vw];
        border: 1px solid;
        padding: .px2vw(3) [ @vw] .px2vw(12) [ @vw];
        border-radius: 4px;
        &:not(:last-child) {
          margin-right: .px2vw(15) [ @vw];
        }
      }
      .problem {
        color: @green;
        border-color: @green;
      }
      .is-on-side {
        color: @orange;
        border-color: @orange;
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
</style>
