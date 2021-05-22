import Vue from 'vue';
import dayjs from 'dayjs';

export const store = new Vue({
  data: {
    appId: 'ed7311670c0e4a6a93c93a0cd75fc55b',
    appKey: 'zb_ep',
    userInfo: {},
    appInfo: {},
    routeList: [],
    dateList: [],
    noList: [],
    householdList: [],
    identityList: [],
    educationList: [],
    positionList: [],
    pointTypeList: [],
    problemList: [],
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
    processList: [
      { name: '全部', code: '全部' },
      { name: '进行中', code: '进行中' },
      { name: '已解决', code: '已解决' },
    ],
  },
  methods: {
    getMonthList(count) {
      const monthList = [];
      for (let i = 0; i < count; i++) {
        monthList.push({
          label: `${i + 1}月`,
          value: i + 1,
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
          label: `${i}年`,
          value: i,
          month: i === currentYear ? currentYearMonthList : normalMonthList,
        });
      }
      this.dateList = _dateList;
    },
    initNo() {
      for (let i = 0; i < 20; i++) {
        this.noList.push({ label: `10${i}`, value: `10${i}` });
      }
    },
  },
  created() {
    this.initDate();
    this.initNo();
  },
});
