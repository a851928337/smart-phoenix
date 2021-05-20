import { store } from './store';
export const mixin = {
  filters: {
    problem(v) {
      return store.problemList.filter((item) => {
        return item.value === v;
      })[0].label;
    },
    process(v) {
      return store.processList.filter((item) => {
        return item.value === v;
      })[0].label;
    },
    shipment(v) {
      return ['户主', '配偶', '子', '女', '父母', '兄弟姐妹', '（外）孙子女'][
        v
      ];
    },
    gender(v) {
      return ['男', '女'][v];
    },
    education(v) {
      return [
        '丈育',
        '半丈育',
        '学龄前',
        '小学',
        '初中',
        '中专/中技',
        '高中',
        '带专',
        '大学',
        '研究生',
      ][v];
    },
    identity(v) {
      return [
        '创业人员',
        '困难人员',
        '低保户',
        '五保人员',
        '临时生活救助',
        '残疾人',
        '老年人',
        '学生',
      ][v];
    },
  },
  methods: {
    px2vw(px) {
      return (px / 750) * 100 + 'vw';
    },
  },
};
