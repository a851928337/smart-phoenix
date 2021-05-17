<template>
  <div class="record-submit-page">
    <record-submit-card title="户地址">
      <template #content>
        <div class="content address">淄博市临淄区凤凰镇什么村几组几号</div>
      </template>
    </record-submit-card>

    <record-submit-card title="户成员" class="people">
      <template #title-right>
        <div
          :class="['collapse-btn', { active: showCollapse }]"
          @click="triggerCollapse"
        >
          {{ showCollapse ? '隐藏成员' : '查看成员' }}
          <i class="iconfont icon-xia2" />
        </div>
      </template>
    </record-submit-card>

    <record-submit-card title="户情况">
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
            :checkboxList="pointTypeList"
          />
        </div>
      </template>
    </record-submit-card>
    <record-submit-card title="走访信息">
      <template #content>
        <div class="content">
          <cell label="走访时间" type="click" @click="onChooseDate">
            <div>2021-05-14 12:06</div>
          </cell>
        </div>
      </template>
    </record-submit-card>
  </div>
</template>

<script>
import Cell from '@/components/Cell';
import RecordSubmitCard from '@/components/RecordSubmitCard';
export default {
  name: 'record-submit-page',
  components: { Cell, RecordSubmitCard },
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
      },
      pointTypeList: [
        { text: '老党员' },
        { text: '困难群众' },
        { text: '孤寡老人' },
        { text: '留守儿童' },
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
  }
}
</style>
