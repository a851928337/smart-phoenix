import Vue from 'vue';
import {
  List,
  PullRefresh,
  Search,
  Radio,
  Switch,
  CheckboxGroup,
  Checkbox,
  ActionSheet,
  Calendar,
  DatetimePicker,
  Picker,
  RadioGroup,
  Button,
  Toast,
} from 'vant';

const CompMap = {
  List,
  PullRefresh,
  Search,
  Radio,
  Switch,
  CheckboxGroup,
  Checkbox,
  ActionSheet,
  Calendar,
  DatetimePicker,
  Picker,
  RadioGroup,
  Button,
  Toast,
};

export function use(componentArr) {
  const obj = {};
  componentArr.forEach((comp) => {
    obj[comp] = CompMap[comp];
    Vue.use(CompMap[comp]);
  });
  return obj;
}
