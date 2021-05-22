import Vue from 'vue';
import dayjs from 'dayjs';

export const store = new Vue({
  data: {
    appId: 'ed7311670c0e4a6a93c93a0cd75fc55b',
    appKey: 'zb_ep',
    userInfo: {},
    appInfo: {},
    routeList: [],
    dateList: [
      { name: '全部日期', code: '', month: [{ name: '全部日期', code: '' }] },
    ],
    noList: [{ name: '全部总户', code: '' }],
    problemList: [{ name: '全部问题', code: '' }],
    processList: [
      { name: '全部', code: '' },
      { name: '进行中', code: '0' },
      { name: '已解决', code: '1' },
    ],
    householdList: [],
    identityList: [],
    educationList: [],
    positionList: [],
    pointTypeList: [],
    shipmentList: [
      { name: '户主', code: '户主' },
      { name: '配偶', code: '配偶' },
      { name: '子', code: '子' },
      { name: '女', code: '女' },
      { name: '父母', code: '父母' },
      { name: '兄弟姐妹', code: '兄弟姐妹' },
      { name: '（外）孙子女', code: '（外）孙子女' },
    ],
    genderList: [
      { name: '男', code: '男' },
      { name: '女', code: '女' },
    ],
    personInfo: {},
  },
  methods: {
    getMonthList(count) {
      const monthList = [];
      for (let i = 0; i < count; i++) {
        let month = i + 1;
        month = month < 10 ? '0' + month : month;
        monthList.push({
          name: `${i + 1}月`,
          code: month,
        });
      }
      return monthList;
    },
    initDate() {
      const currentMonth = dayjs().get('months') + 1;
      const currentYearMonthList = this.getMonthList(currentMonth);
      const normalMonthList = this.getMonthList(12);
      const currentYear = dayjs().get('years');
      const _dateList = [];
      for (let i = currentYear; i > currentYear - 20; i--) {
        _dateList.push({
          name: `${i}年`,
          code: i,
          month: i === currentYear ? currentYearMonthList : normalMonthList,
        });
      }
      this.dateList.push(..._dateList);
    },
  },
  created() {
    this.initDate();
  },
});
