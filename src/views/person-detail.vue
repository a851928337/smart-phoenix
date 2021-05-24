<template>
  <div class="people-detail-page">
    <div class="card">
      <div class="row" v-for="(item, index) in card1List" :key="index">
        <div class="label">
          <img :src="item.icon" />
          {{ item.label }}
        </div>
        <div class="value">{{ detail[item.key] }}</div>
      </div>
    </div>
    <div class="card">
      <div class="row" v-for="(item, index) in card2List" :key="index">
        <div class="label">
          <img :src="item.icon" />
          {{ item.label }}
        </div>
        <div class="value">{{ detail[item.key] }}</div>
      </div>
    </div>
    <div class="card">
      <div class="content">
        <div class="row">
          <div class="label">是否党员</div>
          <div class="value">{{ detail.is_cpc }}</div>
        </div>
        <div class="row">
          <div class="label">人群分类</div>
          <div class="value">{{ detail.people_class }}</div>
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
</template>

<script>
import { getResidentDetail } from '@/api/api';
import { mixin } from '@/assets/mixin';
export default {
  name: 'visit-record-detail-page',
  mixins: [mixin],
  data() {
    return {
      detail: {},
      card1List: [
        {
          label: '与户主关系',
          key: 'relation',
          icon: require('@/assets/image/shipment.png'),
        },
        {
          label: '性别',
          key: 'resident_sex',
          icon: require('@/assets/image/gender.png'),
        },
        {
          label: '身份证号',
          key: 'resident_no',
          icon: require('@/assets/image/idcard.png'),
        },
      ],
      card2List: [
        {
          label: '文化程度',
          key: 'education',
          icon: require('@/assets/image/education.png'),
        },
        {
          label: '工作单位',
          key: 'work_unit',
          icon: require('@/assets/image/work.png'),
        },
        {
          label: '职业',
          key: 'profession',
          icon: require('@/assets/image/work.png'),
        },
        {
          label: '常住地',
          key: 'resident_address',
          icon: require('@/assets/image/work.png'),
        },
        {
          label: '联系电话',
          key: 'contact_no',
          icon: require('@/assets/image/phone2.png'),
        },
      ],
    };
  },
  mounted() {
    this.init();
    this.$store.$off('title-right-click');
    this.$store.$on('title-right-click', () => {
      this.$store.personInfo = this.detail;
      this.$router.push({
        name: 'person-edit',
        query: {
          id: this.detail.resident_id,
          name: this.detail.resident_name,
          areacode: this.detail.areacode,
          areaname: this.detail.areaname,
        },
      });
    });
    this.$store.$emit('changetitle', this.detail.resident_name);
  },
  destroyed() {
    this.$store.$off('title-right-click');
  },
  methods: {
    async init() {
      const { id } = this.$route.params;
      const res = await getResidentDetail(id);
      const { body } = res.data;
      this.detail = body;
      console.log(res);
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
