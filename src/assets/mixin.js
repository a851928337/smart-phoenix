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
  },
};
