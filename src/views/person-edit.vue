<template>
  <div class="person-edit-page">
    <submit-card>
      <template #content>
        <div class="content">
          <cell
            float="right"
            label="与户主关系"
            type="picker"
            divier-type="line"
            :list="relationList"
            v-model="form.relation"
          />
          <cell
            float="right"
            label="性别"
            type="picker"
            divier-type="line"
            :list="genderList"
            v-model="form.relation"
          />
          <cell
            float="right"
            label="身份证号"
            divier-type="line"
            v-model="form.resident_no"
            placeholder="请输入身份证号码"
          />
        </div>
      </template>
    </submit-card>
    <submit-card>
      <template #content>
        <div class="content">
          <cell
            float="right"
            label="文化程度"
            type="picker"
            divier-type="line"
            :list="educationList"
            v-model="form.education"
          />
          <cell
            float="right"
            label="工作单位"
            divier-type="line"
            v-model="form.work_unit"
            placeholder="请输入工作单位"
          />
          <cell
            float="right"
            label="职业"
            type="picker"
            divier-type="line"
            v-model="form.profession"
            :list="professionList"
          />
          <cell
            float="right"
            label="常住地"
            divier-type="line"
            v-model="form.resident_address"
            placeholder="请输入常住地"
          />
          <cell
            float="right"
            label="联系电话"
            divier-type="line"
            v-model="form.contact_no"
            placeholder="请输入联系电话"
          />
        </div>
      </template>
    </submit-card>
    <submit-card>
      <template #content>
        <div class="content">
          <cell
            float="right"
            label="是否党员"
            type="radio"
            divier-type="line"
            :list="cpcList"
            v-model="form.is_cpc"
          />
          <cell
            float="right"
            label="人群分类"
            type="checkbox"
            :list="peopleClassList"
            @change="onPeopleClassChange"
          />
          <cell
            float="right"
            label="备注"
            type="textarea"
            v-model="form.remark"
            placeholder="请输入其他内容"
          />
        </div>
      </template>
    </submit-card>
  </div>
</template>

<script>
import Cell from '@/components/Cell';
import SubmitCard from '@/components/SubmitCard';
import { updateResident } from '@/api/api';
import { use } from '@/assets/js/import-vant';
const { Toast } = use(['Button', 'Toast']);
export default {
  name: 'person-edit-page',
  components: { Cell, SubmitCard },
  data() {
    return {
      form: {
        resident_id: '', // 居民id
        resident_name: '', // 居民名字
        areacode: '', // // 区域代码
        areaname: '', // 区域
        contact_no: '', // 联系方式
        education: 0, // 文化程度
        work_unit: '', // 工作单位
        profession: 0, // 职业
        resident_address: '', // 常住地址
        is_cpc: '是', // 是否党员
        people_class: '', // 人群分类
        remark: '', // 备注
        relation: 0, // 关系
        resident_sex: 0, // 性别
        resident_no: '', // 身份证号
      },
      cpcList: [
        { name: '是', code: '是' },
        { name: '否', code: '否' },
      ],
    };
  },
  mounted() {
    this.$store.$off('title-right-click');
    this.$store.$on('title-right-click', () => {
      this.onSubmit();
    });
    const { id, name, areacode, areaname } = this.$route.query;
    this.$store.$emit('changetitle', name);
    this.form.resident_id = id;
    this.form.resident_name = name;
    this.form.areacode = areacode;
    this.form.areaname = areaname;
  },
  destroyed() {
    this.$store.$off('title-right-click');
  },
  methods: {
    validate() {
      let res = true;
      const { form } = this;
      const whiteList = ['remark'];
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
    onPeopleClassChange(v) {
      this.form.people_class = v;
    },
    async onSubmit() {
      if (this.validate()) {
        this.$toast.loading('正在提交...');
        const formatMap = {
          education: (v) => {
            return this.educationList[v].code;
          },
          people_class: (a) => {
            return this.peopleClassList
              .filter((item, index) => {
                return a.includes(index);
              })
              .map((item) => {
                return item.name;
              })
              .join('、');
          },
          profession: (v) => {
            return this.professionList[v].code;
          },
          relation: (v) => {
            return this.relationList[v].code;
          },
          resident_sex: (v) => {
            return this.genderList[v].code;
          },
        };
        const form = { ...this.form };
        for (let key in form) {
          const format = formatMap[key];
          const val = form[key];
          form[key] = format ? format(val) : val;
        }
        const res = await updateResident(form);
        this.$toast.success('提交成功');
      } else {
        Toast.fail('请填写完整的人员信息');
      }
    },
  },
  computed: {
    relationList() {
      return this.$store.shipmentList;
    },
    genderList() {
      return this.$store.genderList;
    },
    educationList() {
      return this.$store.educationList;
    },
    professionList() {
      return this.$store.positionList;
    },
    peopleClassList() {
      return this.$store.identityList;
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
