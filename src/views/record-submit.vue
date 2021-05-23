<template>
  <div class="record-submit-page">
    <submit-card title="户地址">
      <template #content>
        <div class="content address">
          {{ householdInfo.household_address || '暂无数据' }}
        </div>
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
            v-model="form.interviewee_name"
          />
          <cell
            label="手机号码"
            placeholder="请输入被访人手机号码"
            v-model="form.interviewee_mobile"
          />
          <cell label="是户主" type="switch" v-model="form.is_householder" />
          <cell label="是空户" type="switch" v-model="form.is_empty" />
          <cell label="户口在本辖区内" type="switch" v-model="form.is_local" />
          <cell
            label="户口所在地"
            :wrap="true"
            v-model="form.household_address"
            placeholder="请输入被访人户口所在地"
          />
          <cell
            label="重点走访类型"
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
          <cell label="有反映问题" type="switch" v-model="form.is_problem" />
          <cell
            label="问题描述"
            type="textarea"
            placeholder="请输入问题具体内容"
            v-model="form.problem_desc"
          />
          <cell
            label="问题分类"
            type="picker"
            :list="problemList"
            @change="onProblemTypeChange"
          />
          <cell
            :divier-type="form.method ? 'line' : 'block'"
            label="整改方式"
            type="radio"
            :list="methodList"
            v-model="form.solve_method"
          />
          <!-- <cell
            v-if="form.solve_method === '非现场解决'"
            label="截止时间"
            type="date"
            @click="onChooseDate"
            @change="onEndDateChange"
          /> -->
          <cell
            label="整改措施"
            type="textarea"
            placeholder="请输入整改措施"
            v-model="form.solve_desc"
          />
          <cell
            divier-type="full-line"
            label="问题进度"
            type="radio"
            :list="processList"
            v-model="form.problem_process"
          />
        </div>
        <div class="submit-btn">
          <van-button
            color="#2A987A"
            block
            round
            type="info"
            :disabled="!validate()"
            @click="onSubmit"
            >提交信息</van-button
          >
        </div>
      </template>
    </submit-card>
    <submit-card title="上次走访信息">
      <template #title-right>
        <router-link
          tag="div"
          class="more-record"
          :to="{
            name: 'visit-record',
            query: { no: householdInfo.household_name },
          }"
        >
          历史走访
          <i class="iconfont icon-you" />
        </router-link>
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
use(['Button', 'Toast']);

import { getHouseholdDetail, addVisitRecord } from '@/api/api';
export default {
  name: 'record-submit-page',
  components: { Cell, SubmitCard, RecordCard, PersonCard },
  data() {
    return {
      showCollapse: false,
      householdInfo: {},
      form: {
        household_id: '', // 户id
        interviewee_name: '', // 受访人姓名
        interviewee_mobile: '', // 受访人手机号码
        is_householder: false, // 是否户主
        is_empty: true, // 是否空户
        is_local: true, // 户口在本辖区内
        household_address: '', // 户口所在地
        visit_class: [], // 重点走访类型
        visit_time: '', //  走访时间
        is_problem: true, // 是否反映问题
        problem_desc: '', // 问题描述
        problem_type: '', // 问题分类
        solve_method: '现场解决', // 解决方法
        solve_desc: '', // 整改措施
        // endDate: '',
        problem_process: 0, // 问题进度
      },
      peopleList: [],
      methodList: [
        { name: '现场解决', code: '现场解决' },
        { name: '非现场解决', code: '非现场解决' },
      ],
      processList: [
        { name: '进行中', code: 0 },
        { name: '已解决', code: 1 },
      ],
      record: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const { id } = this.$route.params;
      const res = await getHouseholdDetail(id);
      const { body } = res.data;
      const { household, last_grid_visit, list } = body;
      this.peopleList = list;
      this.householdInfo = household;
      this.form.household_id = household.household_id;
      this.record = last_grid_visit[0];
    },
    validate() {
      let res = true;
      const { form } = this;
      const whiteList = ['solve_desc', 'problem_desc'];
      for (let key in form) {
        const val = form[key];
        if (
          !whiteList.includes(key) &&
          (val === '' ||
            val == null ||
            val == undefined ||
            val?.length == 0 ||
            val == {})
        ) {
          res = false;
          break;
        }
      }
      return res;
    },
    triggerCollapse() {
      this.showCollapse = !this.showCollapse;
    },
    onPointTypeChange(v) {
      this.form.visit_class = v;
    },
    onChooseDate() {
      console.log('选择日期');
    },
    onDateChange(v) {
      this.form.visit_time = v;
    },
    onMethodChange(v) {
      this.form.method = v;
    },
    onEndDateChange(v) {
      this.form.endDate = v;
    },
    onProblemTypeChange(v) {
      this.form.problem_type = v;
    },
    async onSubmit() {
      this.$toast.loading('正在提交...');
      const form = { ...this.form };
      for (let key in form) {
        const val = form[key];
        if (typeof val == 'boolean') {
          if (val) {
            form[key] = '是';
          } else {
            form[key] = '否';
          }
        }
      }
      form.problem_process = this.processList[form.problem_process].code;
      form.problem_type = this.problemList[form.problem_process].code;
      form.visit_class = this.pointTypeList
        .filter((item, index) => {
          return form.visit_class.includes(index);
        })
        .map((item) => {
          return item.name;
        })
        .join('、');
      const res = await addVisitRecord(form);
      this.$toast.success('提交成功');
      this.init();
    },
  },
  computed: {
    pointTypeList() {
      return this.$store.pointTypeList;
    },
    problemList() {
      const list = JSON.parse(JSON.stringify(this.$store.problemList));
      list.splice(0, 1);
      return list;
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
