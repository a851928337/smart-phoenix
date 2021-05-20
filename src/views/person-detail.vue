<template>
  <pull-refresh-list
    class="people-detail-page"
    finished-text=""
    :refresh.sync="refresh"
    :loading.sync="loading"
    :finished="finished"
    @load="onLoad"
    @refresh="onLoad"
  >
    <div v-if="!loading">
      <div class="card">
        <div class="row" v-for="(item, index) in card1List" :key="index">
          <div class="label">
            <img :src="item.icon" />
            {{ item.label }}
          </div>
          <div class="value">{{ filter(item, detail[item.key]) }}</div>
        </div>
      </div>
      <div class="card">
        <div class="row" v-for="(item, index) in card2List" :key="index">
          <div class="label">
            <img :src="item.icon" />
            {{ item.label }}
          </div>
          <div class="value">{{ filter(item, detail[item.key]) }}</div>
        </div>
      </div>
      <div class="card">
        <div class="content">
          <div class="row">
            <div class="label">是否党员</div>
            <div class="value">{{ detail.isMember ? '是' : '否' }}</div>
          </div>
          <div class="row">
            <div class="label">人群分类</div>
            <div class="value">{{ identityStr }}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="row">
          <div class="label">备注</div>
          <div class="value">{{ detail.remark || '无' }}</div>
        </div>
      </div>
    </div>
  </pull-refresh-list>
</template>

<script>
import PullRefreshList from '@/components/PullRefreshList';
import { mixin } from '@/assets/mixin';
const imgBaseUrl = '~@/assets/image/';
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
        {
          label: '与户主关系',
          key: 'shipment',
          filter: this.shipment,
          icon: require('@/assets/image/shipment.png'),
        },
        {
          label: '性别',
          key: 'gender',
          filter: this.gender,
          icon: require('@/assets/image/gender.png'),
        },
        {
          label: '身份证号',
          key: 'idCard',
          icon: require('@/assets/image/idcard.png'),
        },
      ],
      card2List: [
        {
          label: '文化程度',
          key: 'education',
          filter: this.education,
          icon: require('@/assets/image/education.png'),
        },
        {
          label: '工作单位',
          key: 'work',
          icon: require('@/assets/image/work.png'),
        },
        {
          label: '职业',
          key: 'position',
          filter: this.position,
          icon: require('@/assets/image/work.png'),
        },
        {
          label: '常住地',
          key: 'address',
          icon: require('@/assets/image/work.png'),
        },
        {
          label: '联系电话',
          key: 'phone',
          icon: require('@/assets/image/phone2.png'),
        },
      ],
    };
  },
  mounted() {
    this.$store.$off('title-right-click');
    this.$store.$on('title-right-click', () => {
      this.$router.push({
        name: 'person-edit',
        params: {
          id: this.$route.params.id,
        },
      });
    });
  },
  destroyed() {
    this.$store.$off('title-right-click');
  },
  methods: {
    filter(item, value) {
      const f = item.filter;
      if (f) {
        return f(value);
      } else {
        return value;
      }
    },
    onLoad() {
      setTimeout(() => {
        this.$store.$emit('changetitle', '王璐');
        this.detail = {
          shipment: 0,
          gender: 0,
          idCard: 3200000000000000,
          education: 0,
          work: '山东省临淄市先休息休息小区3栋',
          position: 0,
          address: '山东省临淄市先休息休息小区3栋',
          phone: '13888888888',
          isMember: true,
          identity: [0, 1],
        };
        this.refresh = false;
        this.loading = false;
        this.finished = true;
      }, 500);
    },
  },
  computed: {
    identityStr() {
      return this.detail.identity
        ?.map((item) => {
          return this.identity(item);
        })
        .join('、');
    },
  },
};
</script>

<style lang="less" scoped>
.people-detail-page {
  @border:1px solid #E8E8E8;
  .card {
    &:not(:nth-last-child(-n + 2)) {
      border-bottom: @border;
    }
    &:not(:last-child) {
      margin-left: .px2vw(56) [ @vw];
      padding: .px2vw(66) [ @vw] .px2vw(12) [ @vw] .px2vw(47) [ @vw] .px2vw(20)
        [ @vw];
    }
    &:last-child {
      border-top: @border;
      // border-bottom: @border;
      padding: .px2vw(27) [ @vw] .px2vw(12) [ @vw] .px2vw(22) [ @vw] .px2vw(76)
        [ @vw];
    }
    .row {
      display: flex;
      align-items: flex-start;
      color: #666;
      &:not(:last-child) {
        margin-bottom: .px2vw(20) [ @vw];
      }
      .label {
        width: .px2vw(218) [ @vw];
        display: flex;
        align-items: center;
        font-size: .px2vw(30) [ @vw];
        padding-left: .px2vw(44) [ @vw];
        box-sizing: border-box;
        position: relative;
        img {
          position: absolute;
          left: 0;
          height: .px2vw(26) [ @vw];
        }
      }
      .value {
        flex: 1;
        font-size: .px2vw(30) [ @vw];
        font-weight: bold;
        color: #333;
      }
    }
    .content {
      border-left: 3px solid @green;
      * {
        color: @green !important;
      }
    }
  }
}
</style>
