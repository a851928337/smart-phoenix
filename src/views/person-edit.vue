<template>
  <div class="person-edit-page">
    <submit-card>
      <template #content>
        <div class="content">
          <cell
            divier-type="line"
            label="被访人姓名"
            placeholder="请输入被访人姓名"
            v-model="form.name"
          />
          <cell
            divier-type="line"
            label="手机号码"
            placeholder="请输入被访人手机号码"
            v-model="form.phone"
          />
          <cell
            divier-type="line"
            label="是户主"
            type="switch"
            v-model="form.isHead"
          />
          <cell
            divier-type="line"
            label="是空户"
            type="switch"
            v-model="form.isEmpty"
          />
          <cell
            divier-type="line"
            label="户口在本辖区内"
            type="switch"
            v-model="form.isInArea"
          />
          <cell
            divier-type="line"
            label="户口所在地"
            :wrap="true"
            v-model="form.address"
            placeholder="请输入被访人户口所在地"
          />
          <cell
            divier-type="line"
            label="户口在本辖区内"
            type="checkbox"
            @change="onPointTypeChange"
            :list="pointTypeList"
          />
        </div>
      </template>
    </submit-card>
    <submit-card>
      <template #content>
        <div class="content">
          <cell
            divier-type="line"
            label="走访时间"
            type="date"
            @click="onChooseDate"
            @change="onDateChange"
          />
          <cell
            divier-type="line"
            label="有反映问题"
            type="switch"
            v-model="form.isProblem"
          />
          <cell
            divier-type="line"
            label="问题描述"
            type="textarea"
            placeholder="请输入问题具体内容"
          />
          <cell
            divier-type="line"
            label="问题分类"
            type="picker"
            :list="problemList"
          />
          <cell
            divier-type="line"
            label="整改方式"
            type="radio"
            :list="methodList"
            v-model="form.method"
          />
          <cell
            divier-type="line"
            v-if="form.method"
            label="截止时间"
            type="date"
            @click="onChooseDate"
            @change="onEndDateChange"
          />
          <cell
            divier-type="line"
            label="整改措施"
            type="textarea"
            placeholder="请输入整改措施"
          />
          <cell
            divier-type="line"
            label="问题进度"
            type="radio"
            :list="processList"
            v-model="form.process"
          />
        </div>
      </template>
    </submit-card>
  </div>
</template>

<script>
import Cell from '@/components/Cell';
import SubmitCard from '@/components/SubmitCard';
import { use } from '@/assets/js/import-vant';
use(['Button']);
export default {
  name: 'person-edit-page',
  components: { Cell, SubmitCard },
  mounted() {
    this.$store.$emit('changetitle', '王璐');
  },
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
      pointTypeList: [
        { text: '老党员' },
        { text: '困难群众' },
        { text: '孤寡老人' },
        { text: '留守儿童' },
      ],
      problemList: [
        { text: '环境治理' },
        { text: '基础教育' },
        { text: '医疗卫生' },
        { text: '社会治安' },
        { text: '文体生活' },
        { text: '就业问题' },
        { text: '其他' },
      ],
      methodList: [
        { text: '现场解决', value: 0 },
        { text: '非现场解决', value: 1 },
      ],
      processList: [
        { text: '已解决', value: 0 },
        { text: '进行中', value: 1 },
      ],
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
};
</script>

<style lang="less" scoped>
.person-edit-page {
  min-height: 100%;
  background-color: #eee;
  overflow: auto;
}
</style>
