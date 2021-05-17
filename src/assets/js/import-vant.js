import Vue from 'vue';
import {
  List,
  PullRefresh,
  Search,
  Radio,
  Switch,
  CheckboxGroup,
  Checkbox,
} from 'vant';

const CompMap = {
  List,
  PullRefresh,
  Search,
  Radio,
  Switch,
  CheckboxGroup,
  Checkbox,
};

export function use(componentArr) {
  componentArr.forEach((comp) => {
    Vue.use(CompMap[comp]);
  });
}
