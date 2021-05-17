import Vue from 'vue';
import dayjs from 'dayjs';

export const store = new Vue({
  data: {
    routeList: [],
    dateList: [],
    noList: [{ label: '全部总户', value: '' }],
    problemList: [
      { label: '全部问题', value: '' },
      { label: '生态环境', value: 0 },
      { label: '基础教育', value: 1 },
      { label: '医疗卫生', value: 2 },
      { label: '社会治安', value: 3 },
      { label: '就业问题', value: 4 },
      { label: '其他', value: 5 },
    ],
    processList: [
      { label: '全部', value: '' },
      { label: '进行中', value: 0 },
      { label: '已解决', value: 1 },
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
