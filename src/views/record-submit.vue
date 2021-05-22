<template>
  <div class="record-submit-page">
    <submit-card title="户地址">
      <template #content>
        <div class="content address">淄博市临淄区凤凰镇什么村几组几号</div>
      </template>
    </submit-card>

    <submit-card title="户成员" class="people">
      <template #title-right>
        <div
          :class="['collapse-btn', { active: showCollapse }]"
          @click="triggerCollapse"
        >
          {{ showCollapse ? '隐藏成员' : '查看成员' }}
          <i class="iconfont icon-xia2" />
        </div>
      </template>
      <template #content>
        <div v-show="showCollapse" class="people-list">
          <person-card
            v-for="(item, index) in peopleList"
            :key="index"
            :item="item"
          />
        </div>
      </template>
    </submit-card>

    <submit-card title="户情况">
      <template #content>
        <div class="content">
          <cell
            label="被访人姓名"
            placeholder="请输入被访人姓名"
            v-model="form.name"
          />
          <cell
            label="手机号码"
            placeholder="请输入被访人手机号码"
            v-model="form.phone"
          />
          <cell label="是户主" type="switch" v-model="form.isHead" />
          <cell label="是空户" type="switch" v-model="form.isEmpty" />
          <cell label="户口在本辖区内" type="switch" v-model="form.isInArea" />
          <cell
            label="户口所在地"
            :wrap="true"
            v-model="form.address"
            placeholder="请输入被访人户口所在地"
          />
          <cell
            label="户口在本辖区内"
            type="checkbox"
            @change="onPointTypeChange"
            :list="pointTypeList"
          />
        </div>
      </template>
    </submit-card>
    <submit-card title="走访信息">
      <template #content>
        <div class="content">
          <cell
            label="走访时间"
            type="date"
            @click="onChooseDate"
            @change="onDateChange"
          />
          <cell label="有反映问题" type="switch" v-model="form.isProblem" />
          <cell
            label="问题描述"
            type="textarea"
            placeholder="请输入问题具体内容"
          />
          <cell label="问题分类" type="picker" :list="problemList" />
          <cell
            :divier-type="form.method ? 'line' : 'block'"
            label="整改方式"
            type="radio"
            :list="methodList"
            v-model="form.method"
          />
          <cell
            v-if="form.method"
            label="截止时间"
            type="date"
            @click="onChooseDate"
            @change="onEndDateChange"
          />
          <cell label="整改措施" type="textarea" placeholder="请输入整改措施" />
          <cell
            divier-type="full-line"
            label="问题进度"
            type="radio"
            :list="processList"
            v-model="form.process"
          />
        </div>
        <div class="submit-btn">
          <van-button color="#2A987A" block round type="info"
            >提交信息</van-button
          >
        </div>
      </template>
    </submit-card>
    <submit-card title="上次走访信息">
      <template #title-right>
        <div class="more-record">
          历史走访
          <i class="iconfont icon-you" />
        </div>
      </template>
      <template #content>
        <record-card class="record-card" :item="record" />
      </template>
    </submit-card>
  </div>
</template>

<script>
import Cell from '@/components/Cell';
import SubmitCard from '@/components/SubmitCard';
import RecordCard from '@/components/RecordCard';
import PersonCard from '@/components/PersonCard';
import { use } from '@/assets/js/import-vant';
use(['Button']);
export default {
  name: 'record-submit-page',
  components: { Cell, SubmitCard, RecordCard, PersonCard },
  data() {
    return {
      showCollapse: false,
      form: {
        name: '',
        phone: '',
        isHead: false,
        isEmpty: true,
        isInArea: true,
        address: '',
        pointType: [],
        date: '',
        isProblem: true,
        method: 0,
        endDate: '',
        process: 0,
      },
      peopleList: [
        {
          id: 0,
          name: '柳园',
          shipment: 0,
          gender: 0,
          education: 0,
          work: '山东省XXXX公司',
          identity: [0],
          member: true,
        },
        {
          id: 1,
          name: '柳园',
          shipment: 0,
          gender: 0,
          education: 0,
          work: '山东省XXXX公司',
          identity: [0],
          member: true,
        },
        {
          id: 2,
          name: '柳园',
          shipment: 0,
          gender: 0,
          education: 0,
          work: '山东省XXXX公司',
          identity: [0],
          member: true,
        },
      ],
      methodList: [
        { name: '现场解决', code: '现场解决' },
        { name: '非现场解决', code: '非现场解决' },
      ],
      processList: [
        { name: '已解决', code: '已解决' },
        { name: '进行中', code: '进行中' },
      ],
      record: {
        id: '0',
        name: '张君雅',
        problem: [0, 1],
        isOnSide: true,
        description:
          '问题描述：生态环境出现现场解决的，事情在2021年12月封路中午生态环境出现，现场解决的事情在，2021年12月封路中午，现场解决的事情在，2021年12月封路中午，现场解决的事情在，2021年12月封路中午',
        status: 0,
        date: '2021-05-10',
      },
    };
  },
  methods: {
    triggerCollapse() {
      this.showCollapse = !this.showCollapse;
    },
    onPointTypeChange(v) {
      console.log(v);
      this.form.pointType = v;
    },
    onChooseDate() {
      console.log('选择日期');
    },
    onDateChange(v) {
      this.form.date = v;
    },
    onMethodChange(v) {
      this.form.method = v;
    },
    onEndDateChange(v) {
      this.form.endDate = v;
    },
  },
  computed: {
    pointTypeList() {
      return this.$store.pointTypeList;
    },
    problemList() {
      return this.$store.problemList;
    },
  },
  watch: {
    'form.isHead': function (nVal) {
      console.log(nVal);
    },
  },
};
</script>

<style lang="less" scoped>
.record-submit-page {
  min-height: 100%;
  background-color: #eee;
  overflow: auto;
  .address {
    font-size: .px2vw(26) [ @vw];
    color: #333;
    padding: 0 .px2vw(50) [ @vw];
    margin-bottom: .px2vw(50) [ @vw];
  }
  .people {
    padding-bottom: .px2vw(25) [ @vw];
    .collapse-btn,
    .collapse-btn * {
      font-weight: bold;
    }
    .collapse-btn {
      color: @green;
      font-size: .px2vw(28) [ @vw];
      i {
        display: inline-block;
        font-size: .px2vw(20) [ @vw];
        transition: all 0.2s linear;
      }
      &.active {
        i {
          transform: rotate(180deg);
          transform-origin: 50% 50%;
        }
      }
    }
    .people-list {
      padding: 0 .px2vw(20) [ @vw];
    }
  }
  .submit-btn {
    padding: .px2vw(42) [ @vw] .px2vw(50) [ @vw] .px2vw(78) [ @vw];
    border-top: 1px solid #e8e8e8;
  }
  .more-record,
  .more-record .icon-you {
    font-size: .px2vw(24) [ @vw];
  }
  .record-card {
    border-top: 1px solid #e8e8e8;
  }
}
</style>
