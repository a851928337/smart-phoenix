import Vue from 'vue';
import dayjs from 'dayjs';

export const store = new Vue({
  data: {
    routeList: [],
    dateList: [],
    noList: [],
    problemList: [
      { label: '生态环境', value: 0 },
      { label: '现场解决', value: 1 },
    ],
    processList: [
      { label: '未解决', value: 0 },
      { label: '进行中', value: 1 },
      { label: '已解决', value: 2 },
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
      for (let i = currentYear; i > currentYear - 10; i--) {
        _dateList.push({
          label: `${i}年`,
          value: i,
          month: i === currentYear ? currentYearMonthList : normalMonthList,
        });
      }
      this.dateList = _dateList;
    },
    initNo() {
      this.noList = [
        { label: '101', value: '101' },
        { label: '102', value: '102' },
        { label: '103', value: '103' },
        { label: '104', value: '104' },
      ];
    },
  },
  created() {
    this.initDate();
    this.initNo();
  },
});
