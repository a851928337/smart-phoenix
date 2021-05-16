import Vue from 'vue';
import { List, PullRefresh } from 'vant';

const CompMap = {
  List,
  PullRefresh,
};

export function use(componentArr) {
  componentArr.forEach((comp) => {
    Vue.use(CompMap[comp]);
  });
}
